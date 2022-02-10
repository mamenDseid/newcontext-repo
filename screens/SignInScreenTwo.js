import { StyleSheet, ActivityIndicator, Text, View, Platform, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithCredential, getAuth } from '@firebase/auth';
import { CredentialsContext } from "../components/CredentialsContext"

import { auth } from '../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreenTwo() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
  
  
  
    return (

        <View style={styles.container} >
        {!loading ? (
            <>
                <Image style={{ width: 60, height: 60, marginVertical: 20 }} source={{ uri: "https://i.imgur.com/UFpDWQn.png" }} />
                <TouchableOpacity  style={[styles.button, { backgroundColor: '#54b72b' }]}>
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