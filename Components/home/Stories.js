import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const Stories = ({ navigation }) => {
  const [popularProfiles, setPopularProfiles] = useState([]);
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    fetch("https://darkvilla.onrender.com/api/profile/popular", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((profileData) => {
        setPopularProfiles(profileData.slice(0, 10));
      });
  }, []);
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {popularProfiles.map((story, index) =>
          story.userId !== user._id ? (
            <TouchableOpacity
              key={index}
              style={{ alignItems: "center", marginLeft: 18 }}
              onPress={() => navigation.push("ProfileScreen", story)}
            >
              <Image source={{ uri: story.profilePic }} style={styles.story} />
              <Text style={{ color: "white" }}>
                {story.userName.split(" ")[0].length > 11
                  ? story.userName.split(" ")[0].slice(0, 6) + "..."
                  : story.userName.split(" ")[0]}
              </Text>
            </TouchableOpacity>
          ) : (
            <View key={index}></View>
          )
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#689240",
  },
});
export default Stories;
