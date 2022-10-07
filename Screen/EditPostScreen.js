import { Formik } from "formik";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export default function EditPostScreen({ navigation, route }) {
  const updatePost = route.params;
  const uploadPostSchema = Yup.object().shape({
    caption: Yup.string()
      .max(100, "Caption has reached the character limit.")
      .required(),
  });
  const { token } = useSelector((state) => state.tokenReducer);
  const submitUpdateCaption = (caption) => {
    if (!token.access_token) {
      return;
    }
    if (updatePost.caption === caption) {
      return;
    }
    fetch(`https://darkvilla.onrender.com/api/post/caption/${updatePost._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        caption: caption,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        navigation.push("HomeScreen");
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground
        source={require("../assets/image/background1.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={{marginTop: 5}}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/icons/back.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Post</Text>
          <Text></Text>
        </View>
        {/* Update Post */}
        <Formik
          initialValues={{ caption: updatePost.caption }}
          onSubmit={(values) => {
            submitUpdateCaption(values.caption);
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
                <Image
                  source={{ uri: updatePost.imageUrl }}
                  style={{ width: 100, height: 100 }}
                />
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
              <Divider
                width={1}
                orientation="vertical"
                style={{ marginTop: 25, marginHorizontal: 10 }}
              />
              <View style={{ marginTop: 25, marginHorizontal: 10 }}>
                {updatePost.caption === values.caption ? (
                  <Button title="Update Post" disabled={true} />
                ) : (
                  <Button
                    onPress={handleSubmit}
                    title="Update Post"
                    disabled={!isValid}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 23,
  },
});
