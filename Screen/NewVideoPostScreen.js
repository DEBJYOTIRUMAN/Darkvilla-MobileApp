import React, { useState } from "react";
import { ImageBackground, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddNewVideoPost from "../Components/videopost/AddNewVideoPost";
import LottieView from "lottie-react-native";

const NewVideoPostScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground
        source={require("../assets/image/background1.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <AddNewVideoPost
          navigation={navigation}
          progress={progress}
          setProgress={setProgress}
        />
        {progress > 0 && progress < 100 ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              backgroundColor: "#000",
              opacity: 0.8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              style={{ height: 200 }}
              source={require("../assets/animations/loading.json")}
              autoPlay
            />
            <View style={{ position: "absolute" }}>
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                {progress}%
              </Text>
            </View>
          </View>
        ) : (
          <></>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NewVideoPostScreen;
