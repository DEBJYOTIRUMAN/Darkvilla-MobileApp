import {
  View,
  Image,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import DocUploadModal from "./DocUploadModal";
import { useSelector } from "react-redux";
let caption = "";
const uploadPostSchema = Yup.object().shape({
  caption: Yup.string()
    .max(100, "Caption has reached the character limit.")
    .min(6, "Caption must be at least 6 characters.")
    .required(),
});

const FormikPostUploader = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [localUri, setLocalUri] = useState("");
  const [submit, setSubmit] = useState(false);
  const { token } = useSelector((state) => state.tokenReducer);
  // Store New Post
  useEffect(() => {
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

    let formData = new FormData();

    formData.append("image", { uri: localUri, name: filename, type });
    formData.append("caption", caption);
    fetch("https://darkvilla.onrender.com/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((postData) => {
        if(postData.message === "File too large"){
          alert("File is too large.")
        }
        setSubmit(false);
        navigation.push("HomeScreen");
      });
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
            <View style={{marginTop: 25, width: "25%", alignSelf: 'flex-end', marginHorizontal: 5}}>
            {localUri === "" ? (
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
