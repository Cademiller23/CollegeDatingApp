import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import downA from '../../assets/downArrow.png';
import upA from '../../assets/TopArrow.png';
import {MessagingView} from '../Components/MessagingView';
import x from '../../assets/x_icon.png';
    export function MatchingScreen() {
        const [isOverlayVisible, setIsOverlayVisible] = useState(false);

       
        const cardData = [
            {
                "photo1": "pic1"
            },
            {
                "photo2": "Pic2"
            }, {
                "photo3": "Pic3"
            },
            {
                "photo4": "Pic4"
            },
            {
                "photo5": "Pic5"
            },
            {
                "photo6": "Pic6"
            },
            {
                "photo7": "Pic7"
            }, {
                "photo8": "Pic8"
            },
          
        ];
        const renderCard = (card, index) => {
            return (
                <View style={styles.card}>
                    <Text>{card.name}</Text>

                </View>
            );
        };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonTop} onPress={() => setIsOverlayVisible(true)}>
                <Image
                    source={upA} style={styles.arrowImage}/>
            </TouchableOpacity>
            <Swiper
            cards={cardData}
            renderCard={renderCard}
            infinite
            verticalSwipe={false}
            containerStyle={styles.swiperContainer}
            cardIndex={0}
            stackSize={2}
            backgroundColor={'transparent'}
            />
            <TouchableOpacity style={styles.buttonBottom}>
            <Image
                    source={downA} style={styles.arrowImage}/>
            </TouchableOpacity>
        <Modal
        visible={isOverlayVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOverlayVisible(false)}>
            <View style={styles.overlayContainer}>
                <View style={styles.overlay}>
                    <TouchableOpacity onPress={() => setIsOverlayVisible(false)} style={styles.closeButton}>
                        <Image source={x} style={styles.x} />
                    </TouchableOpacity>
                    <MessagingView />
                    <Text>Messaging Area</Text>
                </View>
            </View>
        </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    swiperContainer: {
        flex: 1,

    },
    card: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 8,
    },
    buttonTop: {
        position: 'absolute',
        zIndex: 1,
        top: 50, 
        alignSelf: 'center',
        padding: 10,
    },
    buttonBottom: {
        position: 'absolute',
        zIndex: 1,
        bottom: 1,
        alignSelf: 'center',
        padding: 10,
    },
    arrowImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    overlayContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent Background
    },
    overlay: {
        width: '90%',
        height: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, 
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 2},
    }, 
    closeButton: {
        position: 'absolute',
        top: 10, 
        right: 10, 

    },
    x: {
        width: 30, 
        height: 30,
        resizeMode: 'contain',
    },
});

export default MatchingScreen;