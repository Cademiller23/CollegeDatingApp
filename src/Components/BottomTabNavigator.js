import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home} from '../screens/Home';
import {MatchingScreen} from '../screens/MatchingScreen';
import {CameraScreen} from '../screens/Camera';
const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if(route.name ==='Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if(route.name === 'MatchingScreen') {
                    iconName = focused ? 'chatbox-ellipses' : 'chatbox-outline';
                } else if (route.name === 'CameraScreen') {
                    iconName = focused ? 'camera' : 'camera-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Tab.Screen name="MatchingScreen" component={MatchingScreen} options={{headerShown: false}}/>
        <Tab.Screen name="CameraScreen" component={CameraScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
} 
