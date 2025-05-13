import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import ListScreen from "./src/screens/ListScreen";
import * as Notifications from 'expo-notifications';
import { useEffect } from "react";
import { Alert } from "react-native";



const Tab = createBottomTabNavigator();

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
}
export default function App() {

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
       
        Alert.alert('Notification permissions not granted')
      }
    };

    requestPermissions();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }: { route: any }) => ({
          tabBarIcon: ({ focused, color, size }: TabIconProps) => {
            let iconName: keyof typeof Ionicons.glyphMap =
              route.name === "Home"
                ? focused
                  ? "create"
                  : "create-outline"
                : focused
                ? "document-text"
                : "document-text-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: '#FF8C00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: '#FF8C00',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: "Create Note"
          }}
        />
        <Tab.Screen 
          name="List" 
          component={ListScreen}
          options={{
            title: "Notes"
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
