
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from '../firebase-config';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

/*
 <Feather name="settings" size={24} color="black" />
<Ionicons name="arrow-back" size={24} color="black" />
<Ionicons name="person-add" size={24} color="black" />
 */
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';

export default function ProfileHeader({ uid, username }) {
    const user = useAuthUser(["user"], auth);
    const isTrue = uid === user.data.uid

    const handleGoback = () => {
        console.log("goback");
    }
    return (
        <View>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={isTrue ? "" : handleGoback} >
                    {isTrue ? (
                        <>
                            <Feather name="settings" size={24} color="black" />
                        </>
                    ) : (
                        <>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </>)}
                </TouchableOpacity>

                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{username} </Text>

                <TouchableOpacity>
                    {isTrue ? (
                        <>
                            <Ionicons name="person-add" size={24} color="black" />
                        </>
                    ) : (
                        <>
                            <View />
                        </>
                    )}

                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }
});
