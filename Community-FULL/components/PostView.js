// components/PostView.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Share, Modal, TextInput } from "react-native"; // Hapus Share
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CommentBox from "./CommentBox";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import * as Sharing from 'expo-sharing'; // Tambahkan ini

export default function PostView({ post }) {
    // State
    const [isLiked, setIsLiked] = useState(false);
    const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [hasComment, setHasComment] = useState(false);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [likeCount, setLikeCount] = useState(0);

    const navigation = useNavigation();
    const baseUrl = "http://localhost:5000";

    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(`${baseUrl}/posts/${post.id}/likes`);
        setLikeCount(response.data.count);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    const formatTimeAgo = (timestamp) => {
        return moment(timestamp).fromNow();
    };

    // --- Fungsi-fungsi untuk interaksi dengan backend ---

    const fetchLikeStatus = async () => {
        const userId = 2; //  GANTI DENGAN USER ID YANG BENAR! (sementara)
        try {
            const response = await axios.get(`${baseUrl}/posts/${post.id}/like/status`, {
                params: { userId }, // Menggunakan params
            });
            setIsLiked(response.data.liked);
        } catch (error) {
            console.error('Error fetching like status:', error);
            Alert.alert('Error', 'Failed to load like status.');
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${baseUrl}/posts/${post.id}/comments`);
            setComments(response.data);
            setHasComment(response.data.length > 0);
        } catch (error) {
            console.error('Error fetching comments:', error);
            Alert.alert('Error', 'Failed to load comments.');
        }
    };

    const handleLikePress = async () => {
        const userId = 2; // GANTI DENGAN USER ID YANG BENAR!
        try {
            const response = await axios.post(`${baseUrl}/posts/${post.id}/like`, {
                userId,
            });

            setIsLiked(response.data.liked);
            if (response.data.liked) {
                setLikeCount(prevCount => prevCount + 1);
            } else {
                setLikeCount(prevCount => prevCount - 1);
            }

        } catch (error) {
            console.error('Error liking/unliking post:', error);
            Alert.alert('Error', 'Failed to like/unlike post.');
        }
    };

    const handlePostComment = async (commentText) => {
        const userId = 2;  // GANTI DENGAN USER ID YANG BENAR!
        try {
            const response = await axios.post(`${baseUrl}/posts/${post.id}/comments`, {
                text: commentText,
                userId,
            });

            const newComment = response.data;
            setComments([...comments, newComment]);
            setHasComment(true);
            setIsCommentBoxOpen(false);

        } catch (error) {
            console.error('Error posting comment:', error);
            Alert.alert('Error', 'Failed to post comment.');
        }
    };

    const handleCommentPress = () => {
        setIsCommentBoxOpen(!isCommentBoxOpen);
    };

    const handleSharePress = async () => {
        try {
            // Buat URL postingan (GANTI dengan URL yang benar!)
            const postUrl = `${baseUrl}/posts/${post.id}`; // Contoh: http://localhost:5000/posts/123

            // Buat pesan yang akan dibagikan
            const message = `Check this post:\n${post.text}\n${postUrl}`; //  <--  Gunakan post.text

            const result = await Share.share({
                message: message, //  <--  Gunakan variabel message
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared with activity type:", result.activityType);
                } else {
                    console.log("Shared!");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed!");
            }
        } catch (error) {
            Alert.alert("Share Error", "Could not share this post");
            console.error("Share error:", error);
        }
    };

    const handleReportPress = () => {
        setIsReportModalVisible(true);
    };

    const handleCancelReport = () => {
        setIsReportModalVisible(false);
        setReportReason('');
    };

    // Fungsi untuk mengirim laporan ke backend
    const handlePostReport = async () => {
        const userId = 2; // GANTI DENGAN USER ID YANG BENAR!
          if (reportReason.trim() === '') {
              Alert.alert("Report Error", "Please provide a reason for reporting");
              return;
          }
  
          try {
              const response = await axios.post(`${baseUrl}/reports`, {
                  postId: post.id,      // ID postingan yang dilaporkan
                  reason: reportReason, // Alasan laporan
                  userId: userId,  // ID user yang melaporkan
                  reportedUserId: post.user.id, // ID user yang membuat postingan
              });
  
              console.log("Report submitted:", response.data);
              Alert.alert("Report Sent", "Thank you for the report, we will review it soon.");
              setIsReportModalVisible(false); // Tutup modal
              setReportReason(''); // Reset alasan
  
          } catch (error) {
              console.error("Error submitting report:", error);
              // Handle error (tampilkan pesan error, dll.)
               if (error.response) {
                  console.error("Error response data:", error.response.data);
                  console.error("Error response status:", error.response.status);
                  console.error("Error response headers:", error.response.headers);
              } else if (error.request) {
                  console.error("Error request:", error.request);
              } else {
                  console.error('Error message:', error.message);
              }
              Alert.alert('Error', 'Failed to submit report.');
          }
      };
  

    const handleCancelComment = () => {
        setIsCommentBoxOpen(false);
    }

    const handleRecipePress = () => {
        if (post.recipe) {
            navigation.navigate('Recipe Detail', { recipe: post.recipe, user: post.user }); //  <--  Kirim data user!
        }
    };

    const handleImagePress = (imageUrl) => {
        navigation.navigate('Image Viewer', { imageUrl });
    };


    useEffect(() => {
        fetchComments();
        fetchLikeStatus();
        fetchLikeCount();
    }, [post.id]);

    return (
        <View style={styles.postContainer}>
            {/* User Info */}
            <View style={styles.userInfo}>
                {post.user && post.user.profileImage ? (
                    <Image source={{ uri: baseUrl + post.user.profileImage }} style={styles.profileImage} />
                ) : (
                    <Ionicons name="person-circle-outline" size={24} color="#000" />
                )}
                <View style={styles.usernameHandleContainer}>
                    <Text style={styles.username}>
                      {post.user ? `${post.user.firstName} ${post.user.lastName}` : 'Unknown'}
                    </Text>
                    <Text style={styles.userHandle}>
                        {post.user ? `${post.user.username}` : ''} · {post.createdAt ? formatTimeAgo(post.createdAt) : ''} {/*  <--  Tambahkan ini */}
                    </Text>
                </View>
            </View>

            {/* Post Content */}
            <View style={styles.postContentContainer}>
                <View style={styles.postContent}>
                    <Text style={styles.text}>{post.text}</Text>
                    {post.images && (
                        <View style={styles.imageContainer}>
                            {post.images.map((image, index) => (
                              <TouchableOpacity onPress={() => handleImagePress(image)} key={index}>
                                <Image  source={{ uri: baseUrl + image }} style={styles.postImage} />
                              </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {post.recipe && (
                        <TouchableOpacity onPress={handleRecipePress}>
                            <View style={styles.recipeContainer}>
                                {post.recipe.image && (
                                     <Image source={{ uri: post.recipe.image }} style={styles.recipeImage} />
                                 )}
                                <Text style={styles.recipeTitle}>{post.recipe.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Icon Bar */}
            <View style={styles.iconBar}>
                <TouchableOpacity style={styles.iconButton} onPress={handleCommentPress}>
                    <Ionicons name="chatbubble-outline" size={24} color="#000" />
                    <Text style={styles.countText}>{comments.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleLikePress}>
                    <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "black" : "#000"} />
                    <Text style={styles.countText}>{likeCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleSharePress}>
                    <Ionicons name="share-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleReportPress}>
                    <Ionicons name="information-circle-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {(isCommentBoxOpen || hasComment) && <View style={styles.separator} />}

            {isCommentBoxOpen && (
                <View style={{ marginTop: 10 }}>
                    <CommentBox onPostComment={handlePostComment} onCancel={handleCancelComment} />
                </View>
            )}

            {hasComment && (
                <View style={styles.commentSectionContainer}>
                    {comments.map((comment) => (
                         <View key={comment.id} style={styles.commentContainer}>
                         <View style={styles.userInfo}>
                             {/* Fallback jika comment.user atau profileImage null */}
                             {comment.user && comment.user.profileImage ? (
                                <Image source={{ uri: baseUrl + comment.user.profileImage }} style={styles.profileImage} />
                             ) : (
                                 <Ionicons name="person-circle-outline" size={24} color="#000" />
                             )}
                             <View style={styles.usernameHandleContainer}>
                                 {/* Fallback jika comment.user null */}
                                  <Text style={styles.username}>{comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : 'Unknown'}</Text>
                                  <Text style={styles.userHandle}>
                                        {comment.user ? `${comment.user.username}` : ''} · {comment.createdAt ? formatTimeAgo(comment.createdAt) : ''} {/*  <--  Tambahkan ini */}
                                    </Text>
                             </View>
                         </View>
                         <Text style={[styles.text, { marginLeft: 35 }]}>{comment.text}</Text>
                     </View>
                    ))}
                </View>
            )}

            {/* Report Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isReportModalVisible}
                onRequestClose={handleCancelReport}
            >
                <View style={styles.reportModalContainer}>
                    <View style={styles.reportModalContent}>
                        <Text style={styles.reportModalTitle}>Report Post</Text>
                        <TextInput
                            style={styles.reportTextInput}
                            placeholder="Enter report reason..."
                            multiline
                            value={reportReason}
                            onChangeText={setReportReason}
                        />
                        <View style={styles.reportButtonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelReport}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postButton} onPress={handlePostReport}>
                                <Text style={styles.postButtonText}>Report</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    commentSectionContainer: {
        marginLeft: 35
    },
    commentContainer: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    postContainer: {
        marginBottom: 15,
        borderBottomWidth: 0,
        paddingBottom: 15,
        backgroundColor: '#BFC693',
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginHorizontal: 5,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    usernameHandleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    username: {
        fontWeight: "bold",
        fontSize: 16,
        color: '#333',
        marginRight: 5,
    },
    userHandle: {
        fontSize: 12,
        color: "gray"
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    postContentContainer: {
        flexDirection: 'row',
        marginLeft: 35
    },
    postContent: {
        flex: 1,
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: '#333',
    },
    recipeContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFBE2",
        borderRadius: 8,
        padding: 8,
    },
    recipeTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: '#333',
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginTop: 5,
        marginRight: 10,
    },
     postImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 5
    },
    imageContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    iconBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        paddingHorizontal: 10,
      marginLeft: 20,
    },
    iconButton: {
       marginHorizontal: 10,
       flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    countText: {
        marginLeft: 8,
        color: '#000'
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginVertical: 0,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 10,
    },
    reportModalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    reportModalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    reportModalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        color: '#000'
    },
    reportTextInput: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
        minHeight: 80,
        color: '#000'
    },
    reportButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    postButton: {
        backgroundColor: '#8d9a64',
        padding: 8,
        borderRadius: 15,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 8,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});