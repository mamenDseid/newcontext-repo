import React, { useState } from 'react';
import {
    Text, View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Constants from 'expo-constants';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileTabsContent() {
    const [toggletab, setToggle] = useState(0)


    const tabtoogle = (index) => {
        setToggle(index)
    }
    return (
        <View style={styles.conte}>
            <TouchableOpacity onPress={()=> tabtoogle(0)} style={{padding: 5}}>
                <Feather name="grid" size={24} color="black" />

            </TouchableOpacity>

            <TouchableOpacity  onPress={()=> tabtoogle(1)} style={{padding: 5}}>
                <MaterialIcons name="view-carousel" size={28} color="black" />

            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> tabtoogle(2)} style={{padding: 5}}>

                <FontAwesome name="bookmark" size={24} color="black" />


            </TouchableOpacity>
            <TouchableOpacity onPress={()=> tabtoogle(3)} style={{padding: 5}}>
                <Ionicons name="person-circle-outline" size={28} color="black" />

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    conte: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
