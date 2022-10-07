import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default function ShowImageModal({ post, setModalVisible }) {
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
          <View style={styles.footerStyle}>
          <Image
            source={{ uri: post.profilePic }}
            style={styles.profilePic}
          />
          <Text style={{ color: "white", fontWeight: 'bold', marginLeft: 8 }}>{post.userName}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },

  modalCheckoutContainer: {
    height: "100%",
    borderWidth: 1,
    backgroundColor: "black",
  },
  footerStyle: {
    position: "absolute",
    flexDirection: 'row',
    bottom: 15,
    marginHorizontal: 15,
    zIndex: 100,
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#eee",
  },
});
