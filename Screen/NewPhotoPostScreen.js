import React from "react";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddNewPost from "../Components/post/AddNewPost";

const NewPhotoPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground source={require("../assets/image/background1.jpg")} style={{flex: 1}} resizeMode="cover">
      <AddNewPost navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NewPhotoPostScreen;
