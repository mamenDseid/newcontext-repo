import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyTabs from './MyTabs';
import Login from './Login';
import { useAuthUser } from "@react-query-firebase/auth";
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase-config';


const Stack = createNativeStackNavigator();
export default function RootNavigation() {
    const user = useAuthUser(["user"], auth);
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {user.data ? (
                    <>

                        <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={Login} />

                )}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
