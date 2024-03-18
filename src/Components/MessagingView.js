import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {firestore, auth } from '../../firebaseConfig'; // Import auth to use the current user

export function MessagingView() {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messagesFirestore = querySnapshot.docChanges()
                    .filter(({ type }) => type === 'added')
                    .map(({ doc }) => {
                        const message = doc.data();
                        // assuming createdAt is a Timestamp
                        return { ...message, createdAt: message.createdAt.toDate() };
                    })
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                appendMessages(messagesFirestore);
            });

        return () => unsubscribe();
    }, []);

    const appendMessages = (messages) => {
        setMessages(previousMessages => [...messages, ...previousMessages]);
    };

    const handleSend = async () => {
        if (inputText.trim().length > 0) {
            await firestore().collection('Messages').add({
                text: inputText,
                createdAt: firestore.FieldValue.serverTimestamp(),
                user: {
                    _id: auth.currentUser.uid,
                    // Add other user details here (e.g., name, avatar)
                },
            });
            setInputText('');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={{ backgroundColor: '#f0f0f0', padding: 10, margin: 5 }}>{item.text}</Text>}
                inverted
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                <TextInput
                    style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 20, paddingLeft: 15 }}
                    onChangeText={text => setInputText(text)}
                    value={inputText}
                    placeholder="Type a message..."
                />
                <TouchableOpacity onPress={handleSend} style={{ marginLeft: 10 }}>
                    {/* Customize your send button */}
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

