import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import ProfileHeader from './ProfileHeader';

export default function ProfileScreen({ route, navigation }) {
  const { userId, username } = route.params

  return (
    <>
      <StatusBar backgroundColor="default" />
      <SafeAreaView>
        <ProfileHeader userId={userId} username={username} />


      </SafeAreaView>
      
    </>
  );
}

const styles = StyleSheet.create({});
