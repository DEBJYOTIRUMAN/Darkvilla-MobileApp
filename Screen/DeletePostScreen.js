import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function DeletePostScreen({ navigation, route }) {
  const updatePost = route.params;
  const { token } = useSelector((state) => state.tokenReducer);
  const [postDelete, setPostDelete] = useState(false);

  useEffect(() => {
    if (!postDelete) {
      return;
    }

    if (!token.access_token) {
      return;
    }
    fetch(`https://darkvilla.onrender.com/api/post/delete/${updatePost._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setPostDelete(false);
        navigation.push("HomeScreen");
      });
  }, [postDelete]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground source={require("../assets/image/background1.jpg")} style={{flex: 1}} resizeMode="cover">
      <View style={{marginTop: 5}}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/back.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Delete Post</Text>
        <Text></Text>
      </View>
      {/* Delete Post */}
      <View
        style={{
          margin: 20,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Image
          source={{ uri: updatePost.imageUrl }}
          style={{ width: 100, height: 100 }}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {updatePost.caption}
          </Text>
        </View>
      </View>
      <Divider
        width={1}
        orientation="vertical"
        style={{ marginTop: 25, marginHorizontal: 10 }}
      />
      <View style={{ marginTop: 25, marginHorizontal: 10 }}>
      <Button onPress={() => setPostDelete(true)} title="Delete Post" />
      </View>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 23,
  },
});
