import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

const AddNutritionInsight = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [list, setList] = useState([{ item: '' }]);
  const [tip, setTip] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(null);

  // Handle adding list items
  const handleAddListItem = () => {
    setList([...list, { item: '' }]);
  };

  // Handle image selection
  const handleImageSelection = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          setImageUri(asset.uri);
          setImageName(asset.fileName);
        }
      }
    });
  };

  // Handle submitting the nutrition insight
  const handleSubmit = async () => {
    const nutritionData = {
      title: title.trim(),
      description: description.trim(),
      list: list.map(item => item.item.trim()),
      tip: tip.trim(),
      image: imageName,
    };

    console.log('Nutrition Data:', nutritionData);

    const formData = new FormData();
    formData.append('title', nutritionData.title);
    formData.append('description', nutritionData.description);
    formData.append('list', JSON.stringify(nutritionData.list));
    formData.append('tip', nutritionData.tip);

    if (imageUri) {
      try {
        const path = await RNFS.exists(imageUri);
        if (path) {
          const file = {
            uri: imageUri,
            type: 'image/jpeg',
            name: imageName || `nutrition-image-${Date.now()}.jpg`,
          };
          formData.append('image', file);
        } else {
          console.log('Invalid image URI');
        }
      } catch (error) {
        console.error('Error with file URI:', error);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/nutritions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Nutrition Insight added:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error.message);
      alert("Error adding nutrition insight: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <ImageBackground 
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      >
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <ScrollView style={styles.bigContainer}>
          <Text style={styles.header}>Add Nutrition Insight</Text>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Enter Title (e.g., Benefits of Fiber)"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Description (e.g., Fiber is essential for digestive health.)"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Text style={styles.subHeader}>List:</Text>
            <FlatList
              data={list}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.listItem}>
                  <TextInput
                    style={styles.listInput}
                    placeholder="List Item (e.g., Improves digestion)"
                    value={item.item}
                    onChangeText={(text) => {
                      const newList = [...list];
                      newList[index].item = text;
                      setList(newList);
                    }}
                  />
                </View>
              )}
            />
            <TouchableOpacity onPress={handleAddListItem} style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add List Item</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Enter Tip (e.g., Include more whole grains in your diet.)"
              value={tip}
              onChangeText={setTip}
              multiline
            />

            {/* Image Picker Button */}
            <TouchableOpacity onPress={handleImageSelection} style={styles.addButton}>
              <Text style={styles.addButtonText}>{imageUri ? 'Change Image' : 'Add Image'}</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Add Nutrition Insight</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    alignContent: 'center',
    flex: 1,
  },
  safecontainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#333',
    marginTop: 15,
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  addButton: {
    marginVertical: 10,

    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#2A2A2A',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#425700',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    width: '70%',
  },
  submitButtonText: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#D9D9D9',
  },
  listItem: {
    marginBottom: 10,
  },
  listInput: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddNutritionInsight;