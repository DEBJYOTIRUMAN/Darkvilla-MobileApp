import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const MessengerScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground source={require("../assets/image/background1.jpg")} style={{flex: 1}} resizeMode="cover">
      <View style={styles.container}>
        <Header navigation={navigation} />
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>
          COMING SOON
        </Text>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../assets/icons/back.png")}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>Messenger</Text>
    <Text></Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 23,
  },
});
export default MessengerScreen;
