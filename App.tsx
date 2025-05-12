import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import ListScreen from "./src/screens/ListScreen";

const Tab = createBottomTabNavigator();

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
}
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }: { route: any }) => ({
          tabBarIcon: ({ focused, color, size }: TabIconProps) => {
            let iconName: keyof typeof Ionicons.glyphMap =
              route.name === "Home"
                ? focused
                  ? "home"
                  : "home-outline"
                : focused
                ? "list"
                : "list-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="List" component={ListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
