import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from '@firebase/auth';
import { app } from '../../firebaseConfig';


const data = [
  { pictures: "pic1", name: "Picture 1" },
  { pictures: "pic2", name: "Picture 2" },
  { pictures: "pic3", name: "Picture 3" },
  { pictures: "pic4", name: "Picture 4" },
  { pictures: "pic5", name: "Picture 5" },
  { pictures: "pic6", name: "Picture 6" },
  { pictures: "pic7", name: "Picture 7" },
  { pictures: "pic8", name: "Picture 8" },
  { pictures: "pic9", name: "Picture 9" },
  { pictures: "pic10", name: "Picture 10" },
];
//Hashmap or dictionary for index attributes
export  function Home() {

const [movie,SetMovie] = useState('');
const [major, setMajor] = useState('');
const db = getFirestore(app);
const auth = getAuth();

const userid = auth.currentUser?.uid || "p";
const docRef = doc(db, "userAttributes", userid);
getDoc(docRef).then(docSnap =>{
    if (docSnap.exists()) {
        const userData = docSnap.data();
        SetMovie(userData.movie); // Assuming 'movie' is the correct field name
        setMajor(userData.major); // Assuming 'major' is the correct field name
        // Now using a callback in setState to log the value after it's been set
        SetMovie(movie => {
          console.log(movie);
          return movie;
        });
        SetMajor(major => {
          console.log(major);
          return major;
        });
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
});

    const [activeTab, setActiveTab] = useState('photos'); // Default ogitis
    const renderContent = () => {
        switch(activeTab) {
            case 'photos': 
            return (
                <FlatList
                data={data}
                numColumns={2}
                columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
                contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                keyExtractor={(item, idx) => item.name + idx}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.itemContainer}>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </TouchableOpacity>
               
                )}

            />
            );
            case 'messages':
                //Messages component
                return <View style={styles.emptyContainer}><Text>Message Container</Text></View>;
            case 'attributes':
                return <View style={styles.emptyContainer}><Text>Movie: {movie} \n Major: {major}</Text></View>;
                }
            };
  return (
    <GestureHandlerRootView style={styles.flexContainer}>
        <View style={styles.marginTop}>
        <View style={styles.emptyContainer}></View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}
            onPress={() => setActiveTab('photos')}>
            <Text style={styles.buttonText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setActiveTab('messages')}>
            <Text style={styles.buttonText}>Messages</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setActiveTab('attributes')}>
            <Text style={styles.buttonText}>Attributes</Text>
        </TouchableOpacity>
        </View>
            {renderContent()}
         </View>
         </GestureHandlerRootView>
  );
         }
       
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },
    marginTop: {
        marginTop: 20,
    },
    emptyContainer: {
        height: 200,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        borderRadius: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#6b7280',
        width: '48%', // Since we're using two columns, each item should take up less than half of the container width
        margin: '1%', // This serves as the gap between items
        height: 200,
        borderRadius: 20,
    },
    itemText: {
        color: 'white'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 12,

    },
    headerText: {
        fontWeight: "600",
    },
    headerLink: {
        color: "skyblue",
    },

});

export default Home;