import { StyleSheet, ActivityIndicator, Text, View, Platform, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithCredential, getAuth } from '@firebase/auth';
import { CredentialsContext } from "../components/CredentialsContext"

import { auth } from '../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Google from "expo-google-sign-in"
export default function SignInScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const androidClientId = "355903971926-i0cu6of6mcubt971vmq8btsd2qu27dmi.apps.googleusercontent.com"
    const iosClientId = "355903971926-l8rfvfdcbcoj2mn8d19tnm28g3r5sprq.apps.googleusercontent.com"

    const initAsync = async () => {
        try {
            await Google.initAsync({
                clientId: Platform.OS === 'android' ? androidClientId : iosClientId
            })
            getTheUserV()
        } catch (error) {
            console.log(error);
        }
    }


    const getUserDetails = async () => {
        const user = await Google.signInSilentlyAsync()
        setLoading(false)
        user && handleStore({
            userName: user.displayName,
            email: user.email,
            lastSeen: user.lastLoginAt,
            profilePic: user.photoURL,
            uid: user.uid,
            uniName: `@${user.email.split("@")[0]}`
        })

    }

    const handleStore = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('user', jsonValue)
            setStoredCredentials(value)
            navigation.navigate("Tabs")


        } catch (error) {
            console.log(error)
        }
    }

    const getTheUserV = async ()=> {
        const user = await Google.signInSilentlyAsync()
        const { idToken } = user;
        const credential = await GoogleAuthProvider.credential(idToken)
        const authUser = await signInWithCredential(auth, credential)

        if (authUser) {
            const { user } = authUser
            const data = {
                userName: user.displayName,
                email: user.email,
                lastSeen: user.lastLoginAt,
                profilePic: user.photoURL,
                uid: user.uid,
                uniName: `@${user.email.split("@")[0]}`
            }
            setLoading(false)
            handleStore(data)
        } else {
            console.log("Permission denied");
        }
    }
    const handleGoogleSignin = async () => {
        try {
            setLoading(true)
            await Google.askForPlayServicesAsync()
            const { type, user } = await Google.signInAsync()

            if (type === 'success') {
                getTheUserV()
            } else {
                console.log("Google sign in cancelled")
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    useEffect(() => {
        initAsync()
    })
    return (
        <View style={styles.container} >
            {!loading ? (
                <>
                    <Image style={{ width: 60, height: 60, marginVertical: 20 }} source={{ uri: "https://i.imgur.com/UFpDWQn.png" }} />
                    <TouchableOpacity onPress={handleGoogleSignin} style={[styles.button, { backgroundColor: '#54b72b' }]}>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Image style={{ width: 60, height: 60, marginVertical: 20 }} source={{ uri: "https://i.imgur.com/UFpDWQn.png" }} />
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#54b72b' }]}>
                        <ActivityIndicator size="large" color="white" />
                    </TouchableOpacity>
                </>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
