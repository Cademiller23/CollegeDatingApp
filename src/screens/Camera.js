import React,  {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import {Camera } from 'expo-camera';
import AppIcon from '../Components/AppIcon';

export function CameraScreen() {

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View style={styles.container}><Text>Requesting for camera permission</Text></View>;
    }
    if (hasPermission === false) {
      return (
        <View style={styles.notAllowed}> 
      
            <Text style={styles.btnText}>Allow camera Permission</Text>
        </View>
      );
    }
    return (
        <View style={styles.container}> 
           <Camera style={styles.camera} type={type}>
            <TouchableOpacity style={styles.captureBtn}></TouchableOpacity>
            <View style={styles.header}> 
                <AppIcon style={styles.headerIcon} AntName="user" color="#eee" size={24} />
                <AppIcon style={styles.headerIcon} IonName="settings-outline" color="#eee" size={24} />
            </View>
            <View style={styles.sideItem}> 
                <AppIcon style={styles.sideIcons} IonName="camera-outline" size={20} color = "#eee"/>
                <AppIcon style={styles.sideIcons} IonName="flash-outline" size={20} color = "#eee"/>
                <AppIcon style={styles.sideIcons} IonName="close" size={20} color = "black"/>
            </View>
            </Camera>
        </View>
    )


}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
    notAllowed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        padding: 20, 
        backgroundColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    }, 
    btnText: {
        color: '#eee',
        fontSize: 18,
        fontWeight: "bold",
    },
    captureBtn: {
        position: "absolute",
        bottom: 20,
        width: 80,
        height: 80,
        borderRadius: 100, 
        borderColor: "#eee",
        borderWidth: 6,
        alignSelf: "center"
    },
    header: {
        position: "absolute",
        top: 40,
        justifyContent: "space-between",
        padding: 10,
        flexDirection: "row",
        width: "100%"
    },
    headerIcon: {
        width: 50, 
        height: 50,

    },
    sideItem: {
        position: "absolute",
        top: 110,
        right: 0,
        padding: 10,
    },
    sideIcons: {
        width: 45, 
        height: 45,
        marginVertical: 10
    }
})
export default CameraScreen;