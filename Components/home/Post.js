import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import CommentsModal from "./CommentsModal";
import LikesModal from "./LikesModal";
import EditPostModal from "./EditPostModal";
import ShowImageModal from "./ShowImageModal";
import ShowVideoPlayModal from "./ShowVideoPlayModal";
import downloader from "../../downloader";
const Post = ({ post, navigation }) => {
  const { token } = useSelector((state) => state.tokenReducer);
  const { profile } = useSelector((state) => state.profileReducer);
  const [updatePost, setUpdatePost] = useState(post);
  const [submitLikes, setSubmitLikes] = useState(false);
  //Update Post Likes
  useEffect(() => {
    if (!submitLikes) {
      return;
    }
    if (!token.access_token) {
      return;
    }
    let updateLikes = updatePost.likes;
    if (!updateLikes.includes(profile.userId)) {
      updateLikes.push(profile.userId);
    } else {
      updateLikes = updateLikes.filter((item) => item !== profile.userId);
    }
    fetch(`https://darkvilla.onrender.com/api/post/like/${updatePost._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        likes: updateLikes,
      }),
    })
      .then((res) => res.json())
      .then((document) => {
        setUpdatePost(document);
        setSubmitLikes(false);
      });
  }, [submitLikes]);

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader
        updatePost={updatePost}
        navigation={navigation}
        profile={profile}
      />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter
          updatePost={updatePost}
          setUpdatePost={setUpdatePost}
          setSubmitLikes={setSubmitLikes}
          userId={profile.userId}
          userName={profile.userName}
          profilePic={profile.profilePic}
          navigation={navigation}
          profile={profile}
        />
        {updatePost.likes.length !== 0 ? (
          <Likes postLikes={updatePost.likes} navigation={navigation} />
        ) : (
          <></>
        )}

        <Caption updatePost={updatePost} />
        <CommentSection
          userId={profile.userId}
          userName={profile.userName}
          profilePic={profile.profilePic}
          updatePost={updatePost}
          setUpdatePost={setUpdatePost}
          navigation={navigation}
          profile={profile}
        />
        {updatePost.comments.length !== 0 ? (
          <Comments
            oneComment={updatePost.comments[0]}
            navigation={navigation}
            profile={profile}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const PostHeader = ({ updatePost, navigation, profile }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const getProfileById = (Id) => {
    if (profile.userId === Id) {
      navigation.push("ProfileScreen", profile);
    } else {
      fetch(`https://darkvilla.onrender.com/api/profile/user/${Id}`)
        .then((res) => res.json())
        .then((profile) => {
          navigation.push("ProfileScreen", profile);
        });
    }
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 5,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => getProfileById(updatePost.userId)}
        >
          <Image source={{ uri: updatePost.profilePic }} style={styles.story} />
          <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
            {updatePost.userName}
          </Text>
        </TouchableOpacity>
        {updatePost.userId === profile.userId ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require("../../assets/icons/menu2.png")}
              style={{ width: 20, height: 20, marginRight: 5 }}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require("../../assets/icons/menu2.png")}
            style={{ width: 20, height: 20, marginRight: 5 }}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <EditPostModal
          updatePost={updatePost}
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
      </Modal>
    </>
  );
};
const PostImage = ({ post }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          height: 450,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={{ uri: post.imageUrl }}
          style={{ height: "100%", resizeMode: "cover" }}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {!post.videoUrl ? (
          <ShowImageModal post={post} setModalVisible={setModalVisible} />
        ) : (
          <ShowVideoPlayModal post={post} setModalVisible={setModalVisible} />
        )}
      </Modal>
    </>
  );
};
const PostFooter = ({
  updatePost,
  setUpdatePost,
  setSubmitLikes,
  userId,
  userName,
  profilePic,
  navigation,
  profile,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.leftFooterIconsContainer}>
          {/* Likes */}
          <TouchableOpacity onPress={() => setSubmitLikes(true)}>
            <Image
              style={styles.footerIcon}
              source={
                !updatePost.likes.includes(userId)
                  ? require("../../assets/icons/like_normal.png")
                  : require("../../assets/icons/like_heart.png")
              }
            />
          </TouchableOpacity>
          {/* Comments */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.footerIcon}
              source={require("../../assets/icons/comments.png")}
            />
          </TouchableOpacity>
          {/* Shield */}
          <View>
            <Image
              style={styles.footerIcon}
              source={require("../../assets/icons/shield.png")}
            />
          </View>
        </View>
        <View>
          {/* Bookmark */}
          <TouchableOpacity
            onPress={() =>
              updatePost.videoUrl
                ? downloader(
                    updatePost.videoUrl,
                    `${updatePost.title}.${updatePost.videoUrl
                      .split(".")
                      .pop()}`
                  )
                : downloader(
                    updatePost.imageUrl,
                    `${updatePost.title}.${updatePost.imageUrl
                      .split(".")
                      .pop()}`
                  )
            }
          >
            <Image
              style={styles.footerIcon}
              source={require("../../assets/icons/save.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <CommentsModal
          setModalVisible={setModalVisible}
          userId={userId}
          userName={userName}
          profilePic={profilePic}
          updatePost={updatePost}
          setUpdatePost={setUpdatePost}
          navigation={navigation}
          profile={profile}
        />
      </Modal>
    </>
  );
};
const Likes = ({ postLikes, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{ flexDirection: "row", marginTop: 4 }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          {postLikes.length} likes
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <LikesModal
          setModalVisible={setModalVisible}
          navigation={navigation}
          postLikes={postLikes}
        />
      </Modal>
    </>
  );
};
const Caption = ({ updatePost }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "bold", textAlign: "justify" }}>
        {updatePost.userName}
      </Text>
      <Text> #{updatePost.caption}</Text>
    </Text>
  </View>
);
const CommentSection = ({
  userId,
  userName,
  profilePic,
  updatePost,
  setUpdatePost,
  navigation,
  profile,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{ marginTop: 5 }}
        onPress={() => setModalVisible(true)}
      >
        {!!updatePost.comments.length && (
          <Text style={{ color: "gray" }}>
            View{updatePost.comments.length > 1 ? " all" : ""}{" "}
            {updatePost.comments.length}{" "}
            {updatePost.comments.length > 1 ? "comments" : "comment"}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <CommentsModal
          setModalVisible={setModalVisible}
          userId={userId}
          userName={userName}
          profilePic={profilePic}
          updatePost={updatePost}
          setUpdatePost={setUpdatePost}
          navigation={navigation}
          profile={profile}
        />
      </Modal>
    </>
  );
};
const Comments = ({ oneComment, navigation, profile }) => {
  const getProfileById = (userId) => {
    if (profile.userId === userId) {
      navigation.push("ProfileScreen", profile);
    } else {
      fetch(`https://darkvilla.onrender.com/api/profile/user/${userId}`)
        .then((res) => res.json())
        .then((profile) => {
          navigation.push("ProfileScreen", profile);
        });
    }
  };
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", marginTop: 12 }}
      onPress={() => getProfileById(oneComment.userId)}
    >
      <View style={{ width: "10%", justifyContent: "center" }}>
        <Image
          source={{ uri: oneComment.profilePic }}
          style={{ width: 30, height: 30, borderRadius: 50 }}
        />
      </View>
      <View style={{ width: "85%", justifyContent: "center" }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            marginHorizontal: 6,
            textAlign: "justify",
          }}
        >
          {oneComment.userName}
          <Text style={{ color: "white", fontWeight: "100" }}>
            {" "}
            {oneComment.comment}
          </Text>
        </Text>
      </View>
      <View style={{ width: "5%", justifyContent: "center", alignItems: 'flex-end' }}>
        <Image
          source={require("../../assets/icons/dot.png")}
          style={{ width: 16, height: 16 }}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#689240",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
export default Post;
