import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ImageBackground,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/home/Header";
import Post from "../Components/home/Post";
import Stories from "../Components/home/Stories";
import { useIsFocused } from "@react-navigation/native";
import BottomTabs from "../Components/utility/BottomTabs";
import LottieView from "lottie-react-native";
const HomeScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isFocused) {
      if (route.params) {
        setPosts([route.params]);
        return;
      }

      fetch("https://darkvilla.onrender.com/api/post", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((allPost) => {
          setPosts(allPost);
        });
    } else {
      setPosts([]);
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/image/background1.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <Header navigation={navigation} screenName="Popular Posts" />
        <Stories navigation={navigation} />
        <FlatList
          data={posts}
          renderItem={({ item, index }) => (
            <Post
              post={item}
              key={index}
              navigation={navigation}
              setProgress={setProgress}
            />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
        <BottomTabs navigation={navigation} tabName="Home" />
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
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
export default HomeScreen;
