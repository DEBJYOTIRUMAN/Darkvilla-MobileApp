import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/home/Header";
import Post from "../Components/home/Post";
import Stories from "../Components/home/Stories";
import { useIsFocused } from "@react-navigation/native";
import BottomTabs from "../Components/utility/BottomTabs";
const HomeScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  // Get All Post
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
      <ImageBackground source={require("../assets/image/background1.jpg")} style={{flex: 1}} resizeMode="cover">
        <Header
          navigation={navigation}
          posts={posts}
          screenName="Popular Posts"
        />
        <Stories navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {posts.map((post, index) => (
            <Post post={post} key={index} navigation={navigation} />
          ))}
        </ScrollView>
        <BottomTabs navigation={navigation} tabName="Home" />
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
