import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";

export default function EditPostModal({
  updatePost,
  setModalVisible,
  navigation,
}) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalCheckoutContainer}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
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
            Update Post
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
              setModalVisible(false),
                navigation.push("EditPostScreen", updatePost);
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/icons/edit.png")}
              style={{ width: 32, height: 32 }}
            />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 10 }}>
            Edit Post
            </Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false),
                navigation.push("DeletePostScreen", updatePost);
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/icons/delete.png")}
              style={{ width: 32, height: 32 }}
            />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 10 }}>
            Delete Post
            </Text>
          </TouchableOpacity>
          <Divider />
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
    height: 180,
    backgroundColor: "black",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 23,
  },
});
