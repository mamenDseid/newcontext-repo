import { StyleSheet, ActivityIndicator, Text, View, Platform, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithCredential, getAuth } from '@firebase/auth';
import { CredentialsContext } from "../components/CredentialsContext"
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();
/*

  androidClientId: "355903971926-i0cu6of6mcubt971vmq8btsd2qu27dmi.apps.googleusercontent.com",
    iosClientId: "355903971926-l8rfvfdcbcoj2mn8d19tnm28g3r5sprq.apps.googleusercontent.com",
    expoClientId: "355903971926-mgsajft6l19ngrs8gglvadk3vm8cm7n8.apps.googleusercontent.com"


*/
export default function SignInScreenTwo() {
    const [request, response, promptAsync] = Google.useAuthRequest(
        {
            androidClientId: "355903971926-i0cu6of6mcubt971vmq8btsd2qu27dmi.apps.googleusercontent.com",
    iosClientId: "355903971926-l8rfvfdcbcoj2mn8d19tnm28g3r5sprq.apps.googleusercontent.com",
    expoClientId: "355903971926-mgsajft6l19ngrs8gglvadk3vm8cm7n8.apps.googleusercontent.com"
        },
    );
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [idToken, setIdToken] = useState()
    const [message, setMessage] = useState();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    useEffect(() => {
        setMessage(JSON.stringify(response));
        if (response?.type === 'success') {
            console.log(response)
            setIdToken(response.authentication.idToken)
           
        }
    }, [response])

    const loginTofirebase = async (token)=>{
        const provider = new GoogleAuthProvider();
        const credential = provider.credential(token);
      const authUser =  signInWithCredential(auth, credential);

      if(authUser){
        const { user } = authUser
        const data = {
            userName: user.displayName,
            email: user.email,
            lastSeen: user.lastLoginAt,
            profilePic: user.photoURL,
            uid: user.uid,
            uniName: `@${user.email.split("@")[0]}`
        }
        handleStore(data)
      }
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
    return (

        <View style={styles.container} >
            {!loading ? (
                <>
                    <Image style={{ width: 60, height: 60, marginVertical: 20 }} source={{ uri: "https://i.imgur.com/UFpDWQn.png" }} />
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#54b72b' }]}
                        onPress={() => { promptAsync({useProxy: false, showInRecents: true}) }}

disabled={request}
                    >
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login V</Text>
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
    )
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
})