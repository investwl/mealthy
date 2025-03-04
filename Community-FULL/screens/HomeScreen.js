// screens/HomeScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import PostView from '../components/PostView';
import AddPostBox from '../components/AddPostBox';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000'; // Ganti dengan URL backend Anda

export default function HomeScreen({ navigation }) {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedTextSetter, setSelectedTextSetter] = useState(() => {});
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      console.log("Fetching posts from:", `${BACKEND_URL}/posts`);
      const response = await axios.get(`${BACKEND_URL}/posts`);

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;
      console.log("Data dari backend:", data);

      // Pastikan data adalah array sebelum memprosesnya
      if (Array.isArray(data)) {
          const parsedPosts = data.map(post => ({
            ...post,
            images: post.images ? JSON.parse(post.images) : [],  //Parse string to array of image URLs
            recipe: post.recipe,
          }));
          console.log("Parsed Posts:", parsedPosts);
          setPosts(parsedPosts);
        } else {
          console.error("Data from backend is not an array:", data);
          Alert.alert('Error', 'Received invalid data from server.');
        }

    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('Error', 'Failed to load posts.');
    } finally {
      setRefreshing(false);
    }
  }, []);


    // Debounce function (di dalam HomeScreen)
    const debounce = (func, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

  const handleAddRecipe = (setRecipe) => {
    navigation.navigate('Add Recipe', { setRecipe });
  };

  const handleAddEmoji = (setText) => {
    setSelectedTextSetter(() => setText);
    setIsEmojiPickerVisible(true);
  };

  const handleEmojiSelect = (emoji) => {
    selectedTextSetter((existingText) => `${existingText} ${emoji}`);
  };

  const handleCloseEmojiPicker = () => {
    setIsEmojiPickerVisible(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const emojis = ["😂", "👍", "😊", "🙂", "😔", "😭", "😘", "😳", "❤️", "😍", "🥰", "😉", "😇", "😴", "🙈", "😋", "💋", "😁", "😅", "😟", "😜", "😨", "😥", "🙄", "😡", "😮‍💨", "😒", "😓", "😮", "😙", "🤨", "🥴", "👨‍🦰", "🙊", "😄", "😆", "😌", "📦"];

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <AddPostBox
          onAddRecipe={handleAddRecipe}
          onAddEmoji={handleAddEmoji}
          onPost={fetchPosts}
          isEmojiPickerVisible={isEmojiPickerVisible}
          emojis={emojis}
          handleEmojiSelect={handleEmojiSelect}
          handleCloseEmojiPicker={handleCloseEmojiPicker}
        />

        {posts.length === 0 ? (
          <Text style={styles.noPostsText}>No posts yet. Add a post!</Text>
        ) : (
           posts.map((item) => <PostView key={item.id} post={item} />) // Use item.id as key
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noPostsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});