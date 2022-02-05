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
            <TouchableOpacity onPress={()=> tabtoogle(0)}>
                <Feather name="grid" size={24} color="black" />

            </TouchableOpacity>

            <TouchableOpacity  onPress={()=> tabtoogle(1)}>
                <MaterialIcons name="view-carousel" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity  onPress={()=> tabtoogle(2)}>

                <FontAwesome name="bookmark" size={24} color="black" />


            </TouchableOpacity>
            <TouchableOpacity onPress={()=> tabtoogle(3)}>
                <Ionicons name="person-circle-outline" size={24} color="black" />

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    conte: {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});
