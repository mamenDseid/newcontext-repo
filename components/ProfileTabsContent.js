import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';




export default function ProfileTabsContent(){
    return(
        <View style={styles.conte}>

            <Text>hello from tabs</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    conte: {
        marginTop: 25
    }
});