 import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function CommentBox({ onPostComment, onCancel }) {
    const [commentText, setCommentText] = useState('');

    const handlePost = () => {
        onPostComment(commentText);
        setCommentText('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons name="person-circle-outline" size={24} color="#000" />
                <TextInput
                    style={styles.input}
                    placeholder="Post your reply...."
                    value={commentText}
                    onChangeText={setCommentText}
                    multiline
                    textAlignVertical="top"
                    placeholderTextColor="#888"
                />
            </View>
           <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                   <Text style={styles.cancelButtonText}>Cancel</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                   <Text style={styles.postButtonText}>Post</Text>
               </TouchableOpacity>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingtop: 10,
        backgroundColor: '#BFC693',
        borderRadius: 10,
        marginLeft: 25,
    },
    inputContainer: {
      flexDirection: 'row',
        alignItems: "flex-start",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
        marginLeft: 10,
        fontSize: 16,
        minHeight: 40,
        textAlignVertical: 'top',
        paddingVertical: 5,
    },
    buttonContainer: {
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