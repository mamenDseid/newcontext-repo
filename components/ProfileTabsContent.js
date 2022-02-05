import React, { useState, useContext } from 'react';
import {
    Text, View,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import Constants from 'expo-constants';
import { CredentialsContext } from './CredentialsContext';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileTabsContent({userId}) {
    const [toggletab, setToggle] = useState(0)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const { userName, email, lastSeen, profilePic, uid, uniName } = storedCredentials

    const isTrue = userId === uid

    const tabtoogle = (index) => {
        setToggle(index)
    }
    return (
        <>
        <View style={styles.conte}>
            <TouchableOpacity onPress={() => tabtoogle(0)} style={{ padding: 5 }}>
                <Feather name="grid" size={24} style={toggletab === 0 ? styles.active : styles.default} />

            </TouchableOpacity>

            <TouchableOpacity onPress={() => tabtoogle(1)} style={{ padding: 5 }}>
                <MaterialIcons name="view-carousel" size={28} style={toggletab === 1 ? styles.active : styles.default} />

            </TouchableOpacity>
            <TouchableOpacity onPress={() => tabtoogle(2)} style={{ padding: 5 }}>

                <FontAwesome name="bookmark" size={24} style={toggletab === 2 ? styles.active : styles.default} />


            </TouchableOpacity>
            <TouchableOpacity onPress={() => tabtoogle(3)} style={{ padding: 5 }}>
                <Ionicons name="person-circle-outline" size={28} style={toggletab === 3 ? styles.active : styles.default} />

            </TouchableOpacity>
        </View>
        </>
    );
}

const { width: SIZE } = Dimensions.get('window');
const styles = StyleSheet.create({
    conte: {
        marginTop: 20,
       paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: 'rgba(158, 150, 150, .3)',
        


    },
    active: {
        color: "#669ffa"
    },
    default: {
        color: "black"
    }
});
