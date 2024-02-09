import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function ShowImageModal({
  post,
  setModalVisible,
  profile,
  navigation,
}) {
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
    <View style={styles.modalContainer}>
      <View style={styles.modalCheckoutContainer}>
        <ImageBackground
          source={{ uri: post.imageUrl }}
          style={{ flex: 1 }}
          blurRadius={10}
        >
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

          <Image
            source={{ uri: post.imageUrl }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
          <TouchableOpacity
            style={styles.footerStyle}
            onPress={() => getProfileById(profile.userId)}
          >
            <Image
              source={{ uri: post.profilePic }}
              style={styles.profilePic}
            />
            <Text style={{ color: "white", fontWeight: "bold", marginLeft: 8 }}>
              {post.userName}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <StatusBar backgroundColor="#eee" />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },

  modalCheckoutContainer: {
    height: "100%",
    backgroundColor: "black",
  },
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
