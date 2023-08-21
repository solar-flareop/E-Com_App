import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProductInfoScreen from "../screens/ProductInfoScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#008e97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#008e97" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Person"
        component={HomeScreen}
        options={{
          tabBarLabel: "Person",
          tabBarLabelStyle: { color: "#008e97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#008e97" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: { color: "#008e97" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="shoppingcart" size={24} color="#008e97" />
            ) : (
              <AntDesign name="shoppingcart" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Info" component={ProductInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
