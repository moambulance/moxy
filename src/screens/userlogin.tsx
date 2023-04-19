import React from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import LoginScreen from 'react-native-login-screen';
let username="";
const UserLogin = ({ navigation }) => {
  return (
  <LoginScreen
  logoImageSource={require('../assets/images/moxy_logo.jpg')}
  onLoginPress={() => {navigation.navigate("THome",{UserName:username});}}
  onSignupPress={() => {}}
  onEmailChange={(value: string) => {
    username = value;
    
  }}
  loginButtonText={'Login'}
  disableSignup
  disableSocialButtons
  
  onPasswordChange={(password: string) => {}}
  
/>
  );
};

export default UserLogin;