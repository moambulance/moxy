import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home";
import UserLogin from "./src/screens/userlogin";
import GMap from "./src/screens/gmap";
import TrackerHome from "./src/screens/trackerhome";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={UserLogin} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GoogleMap" component={GMap} />
      <Stack.Screen name="THome" component={TrackerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
