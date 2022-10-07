import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";

export default function NewPostModal({ setModalVisible, navigation }) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalCheckoutContainer}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ width: "10%" }}></Text>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
              width: "80%",
              textAlign: "center",
            }}
          >
            New Post
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ width: "10%", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/icons/cancel.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.push("NewPhotoPostScreen");
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/icons/image.png")}
              style={{ width: 35, height: 35 }}
            />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 10 }}>
              Upload Photo
            </Text>
          </TouchableOpacity>
          <Divider width={1} />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.push("NewVideoPostScreen");
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/icons/video.png")}
              style={{ width: 35, height: 35 }}
            />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 10 }}>
              Upload Video
            </Text>
          </TouchableOpacity>
          <Divider width={1} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  modalCheckoutContainer: {
    height: 200,
    backgroundColor: "black",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
