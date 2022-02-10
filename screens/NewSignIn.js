
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GoogleAuthProvider, signInWithCredential, getAuth } from '@firebase/auth';
import { auth } from '../firebase-config';
import { StyleSheet, View, Text, Image, Button, Alert, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function NewSignIn() {
  const [accessToken, setAccessToken] = React.useState();
  const [idToken, setIdToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();
  
  const [request, response, promptAsync] = Google.useAuthRequest({
     androidClientId: "355903971926-i0cu6of6mcubt971vmq8btsd2qu27dmi.apps.googleusercontent.com",
    iosClientId: "355903971926-l8rfvfdcbcoj2mn8d19tnm28g3r5sprq.apps.googleusercontent.com",
    expoClientId: "355903971926-mgsajft6l19ngrs8gglvadk3vm8cm7n8.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      // const {idToken} = response.authentication
      setIdToken(response.authentication.idToken)
      setAccessToken(response.authentication.accessToken);
      // console.log(response)
    }
  }, [response]);

  React.useEffect(()=> {
if(idToken){
  (async()=>{
    try {
      const credential = GoogleAuthProvider.credential(idToken)

      const authUser = await signInWithCredential(auth, credential)

      if(authUser){
        console.log(authUser.user)
      } else {
        console.log("permission denid")
      }

    } catch (error) {
      console.log(error)
    }

  })()
}
  }, [idToken])

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }


 


 
  return (
    <View style={styles.container}>


      {showUserInfo()}
      <Button 
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({useProxy: false, showInRecents: true}) }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});

