import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    const userData = { name, email, password };
    try {
      const res = await axios.post(
        "http://192.168.0.102:8000/register",
        userData
      );
      Alert.alert(
        "Registration successful",
        "You have been registered Successfully"
      );
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert("Registration Error", "An error occurred while registering");
      console.log("registration failed", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* logo */}
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>

      {/* Screen */}
      <KeyboardAvoidingView>
        <View style={styles.logoView}>
          <Text style={styles.logoText}>Register to your account</Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputsView}>
          <View style={styles.inputEmail}>
            <Ionicons
              name="person"
              size={24}
              color="gray"
              style={styles.inputEmailIcon}
            />
            <TextInput
              placeholder="Enter your name"
              value={name}
              style={styles.inputEmailInput}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputEmail}>
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              style={styles.inputEmailIcon}
            />
            <TextInput
              placeholder="Enter your email"
              value={email}
              style={styles.inputEmailInput}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputEmail}>
            <AntDesign
              name="lock"
              size={24}
              color="gray"
              style={styles.inputEmailIcon}
            />
            <TextInput
              placeholder="Enter your password"
              value={password}
              style={styles.inputEmailInput}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>

        <View style={styles.extraView}>
          <Text>Keep me logged in</Text>
          <Text style={styles.forgetPassword}>Forget password ?</Text>
        </View>

        {/* Login Button */}
        <View style={styles.btnView}>
          <Pressable style={styles.pressable} onPress={handleRegister}>
            <Text style={styles.login}>Register</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.redirectView}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.redirectMsg}>
            Already having an account ? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
  },
  logoView: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041e42",
  },
  inputsView: {
    marginTop: 70,
  },
  inputEmail: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#d0d0d0",
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 5,
    borderRadius: 5,
  },
  inputEmailIcon: {
    marginLeft: 8,
  },
  inputEmailInput: {
    color: "gray",
    width: 300,
    marginVertical: 10,
    fontSize: 16,
  },
  extraView: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetPassword: {
    color: "#007fff",
    fontWeight: "500",
  },
  btnView: {
    marginTop: 60,
    alignItems: "center",
  },
  pressable: {
    width: 200,
    backgroundColor: "#febe10",
    padding: 15,
    borderRadius: 6,
  },
  login: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  redirectView: {
    marginTop: 15,
  },
  redirectMsg: {
    color: "gray",
    textAlign: "center",
    fontSize: 16,
  },
});

export default RegisterScreen;
