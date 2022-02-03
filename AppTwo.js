import * as React from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import MyTabs from './screens/MyTabs';
import Login from "./screens/Login"
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';





const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /> 
        <Stack.Screen name="Tabs" component={MyTabs}  options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
   image: {
     width: '100%',
     height: '100%',
     resizeMode: 'cover',
   },
   login: {
     width: 350,
     height: 500,
     borderColor: '#fff',
     borderWidth: 2,
     borderRadius: 10,
     padding: 10,
     alignItems: 'center',
   },
   profilePicture: {
     width: 100,
     height: 100,
     borderRadius: 50,
     borderColor: '#fff',
     borderWidth: 1,
     marginVertical: 30
   },
   input: {
     width: 250,
     height: 40,
     borderColor: '#fff',
     borderWidth: 2,
     borderRadius: 10,
     padding: 10,
     marginVertical: 10,
     backgroundColor: '#ffffff90',
     marginBottom: 20
   },
   button: {
     width: 250,
     height: 40,
     borderRadius: 10,
     alignItems: 'center',
     justifyContent: 'center',
     marginVertical: 10,
     borderColor: '#fff',
     borderWidth: 1,
   }
 });
 