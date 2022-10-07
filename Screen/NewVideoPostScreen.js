import React from "react";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddNewVideoPost from "../Components/videopost/AddNewVideoPost";

const NewVideoPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground source={require("../assets/image/background1.jpg")} style={{flex: 1}} resizeMode="cover">
      <AddNewVideoPost navigation={navigation} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NewVideoPostScreen;
