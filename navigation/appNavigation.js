import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
//Screens
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import HeaderComponent from '../components/headerComponent';

//Screen Names
const homeName = 'Home';
const libraryName = 'Library'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Index" options={{ headerShown: false }} component={HomeScreen} />
        </Stack.Navigator>
    );
}

function LibraryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Index" options={{ headerShown: false }} component={LibraryScreen} />
        </Stack.Navigator>
    );
}

//Buttom Navigator
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        }
                        else if (rn === libraryName) {
                            iconName = focused ? 'folder' : 'folder-outline';
                        }

                        return <Ionicons name={iconName} color={color} size={size} />
                    },
                    //Other Screen properties    
                    //change icon heighlight/background color
                    activeTintColor: '#3a82f6',
                    inactiveTintColor: 'gray',
                    tabBarActiveBackgroundColor: '#555555',
                    tabBarInactiveBackgroundColor: '#555555',

                })}
            >

                {/* Home Screen */}
                <Tab.Screen name={homeName} component={HomeStack}
                    options={{
                        headerShown: false,
                        // tabBarIcon: () => (
                        //     <HomeIcon size="30" strokeWidth={2} color="gray" />)
                    }} />
                {/* Home Screen */}
                <Tab.Screen name={libraryName} component={LibraryStack}
                    options={{
                        headerShown: false,
                        // tabBarIcon: () => (
                        //     <FolderIcon size="30" strokeWidth={2} color="gray" />)
                    }} />
                {/* Add more Tab.Screen for additional tabs */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}