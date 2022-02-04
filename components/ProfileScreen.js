import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import ProfileHeader from './ProfileHeader';
import ProfileMiddle from './ProfileMiddle';
import ProfileDetails from './ProfileDetails';
import TabViewNav from './TabViewNav';
export default function ProfileScreen({ route, navigation }) {
  const { userId, username, userProfilePic } = route.params

  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <SafeAreaView>
        <ProfileHeader userId={userId} username={username} />
        <ProfileMiddle userId={userId} username={username} userProfilePic={userProfilePic} />
      </SafeAreaView>

<ProfileDetails userId={userId} username={username}      />
  
    </>
  );
}

const styles = StyleSheet.create({});
