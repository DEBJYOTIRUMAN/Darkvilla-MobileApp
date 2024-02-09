import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import VideoPlayer from "expo-video-player";

const ShowVideoPlayModal = ({ post, setModalVisible, profile, navigation }) => {
  const getProfileById = (Id) => {
    if (post.userId === Id) {
      setModalVisible(false);
      navigation.push("ProfileScreen", profile);
    } else {
      fetch(`https://darkvilla.onrender.com/api/profile/user/${post.userId}`)
        .then((res) => res.json())
        .then((profile) => {
          setModalVisible(false);
          navigation.push("ProfileScreen", profile);
        });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <VideoPlay post={post} />
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={{
          position: "absolute",
          top: 15,
          left: 15,
          zIndex: 100,
          height: 40,
          width: 40,
        }}
      >
        <Image
          source={require("../../assets/icons/back.png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerStyle}
        onPress={() => getProfileById(profile.userId)}
      >
        <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
        <Text style={{ color: "white", fontWeight: "bold", marginLeft: 8 }}>
          {post.userName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const VideoPlay = ({ post }) => {
  const filename = post.videoUrl.split("/").pop();
  const serverUrl = `https://darkvilla.onrender.com/api/post/video/${filename}`;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: "contain",
          source: {
            uri: serverUrl,
          },
        }}
        slider={{
          visible: false,
        }}
        fullscreen={{
          visible: false,
        }}
        timeVisible={false}
        style={{ height: 600 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  footerStyle: {
    position: "absolute",
    flexDirection: "row",
    bottom: 15,
    marginHorizontal: 15,
    zIndex: 100,
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#eee",
  },
});
export default ShowVideoPlayModal;
