import {
  View,
  Image,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import DocUploadModal from "./DocUploadModal";
import { useSelector } from "react-redux";
import axios from "axios";
let caption = "";
const uploadPostSchema = Yup.object().shape({
  caption: Yup.string()
    .max(100, "Caption has reached the character limit.")
    .min(6, "Caption must be at least 6 characters.")
    .required(),
});

const FormikPostUploader = ({ navigation, progress, setProgress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [localUri, setLocalUri] = useState("");
  const [submit, setSubmit] = useState(false);
  const { token } = useSelector((state) => state.tokenReducer);
  // Store New Post
  useEffect(() => {
    const store = async () => {
      if (!submit) {
        return;
      }
      if (localUri === "") {
        setSubmit(false);
        return;
      }
      if (!token.access_token) {
        setSubmit(false);
        return;
      }
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      if (filename.split(".").pop() == "jpeg") {
        filename = `${filename.split(".")[0]}.jpg`;
      }
      if (type == "image/jpeg") {
        type = "image/jpg";
      }

      let formData = new FormData();

      formData.append("image", { uri: localUri, name: filename, type });
      formData.append("caption", caption);
      try {
        const response = await axios.post(
          "https://darkvilla.onrender.com/api/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token.access_token}`,
            },
            onUploadProgress: ({ loaded, total }) =>
              setProgress(Math.floor((loaded * 100) / total)),
          }
        );

        setSubmit(false);
        setProgress(0);
        navigation.push("HomeScreen");
      } catch (error) {
        Alert.alert("Oops, something went wrong. Maybe file is too large.");
        setSubmit(false);
        setProgress(0);
        navigation.push("HomeScreen");
      }
    };
    store();
  }, [submit]);

  return (
    <>
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={(values) => {
          caption = values.caption;
          setSubmit(true);
        }}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
      >
        {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
          <>
            <View
              style={{
                margin: 20,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ width: 100, height: 100 }}
              >
                <Image
                  source={
                    localUri === ""
                      ? require("../../assets/placeholder_image.jpg")
                      : {
                          uri: localUri,
                        }
                  }
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <TextInput
                  style={{ color: "white", fontSize: 20 }}
                  placeholder="Write a caption..."
                  placeholderTextColor="gray"
                  multiline={true}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
              </View>
            </View>
            <Divider width={1} orientation="vertical" />
            <View
              style={{
                marginTop: 25,
                width: "25%",
                alignSelf: "flex-end",
                marginHorizontal: 5,
              }}
            >
              {localUri === "" || progress > 0 ? (
                <Button title="SHARE" disabled={true} />
              ) : (
                <Button
                  onPress={handleSubmit}
                  title="SHARE"
                  disabled={!isValid}
                />
              )}
            </View>
          </>
        )}
      </Formik>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <DocUploadModal
          setModalVisible={setModalVisible}
          setLocalUri={setLocalUri}
        />
      </Modal>
    </>
  );
};

export default FormikPostUploader;
