import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { CredentialsContext } from './CredentialsContext';
import React, { useContext } from 'react';
import useGetuserDetail from '../hooks/useGetuserDetail';
import ProfileTabsContent from './ProfileTabsContent';
import TabViewNav from './TabViewNav';

export default function ProfileDetails({ userId, username }) {
    const { feeds, follow, following } = useGetuserDetail(userId)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const { userName, email, lastSeen, profilePic, uid, uniName } = storedCredentials

    const isTrue = userId === uid;

    return (
        <>
        <View style={styles.conte}>
            <View style={styles.wrapper}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {feeds.length}
                    </Text>
                    <Text>posts</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{follow.length}</Text>
                        <Text>followers</Text>
                    </TouchableOpacity>
                </View>
                <View>

                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{following.length} </Text>
                        <Text>following</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
        <ProfileTabsContent userId={userId}  feeds={feeds}/>
        </>
    );
}

const styles = StyleSheet.create({
    conte: {
        marginTop: 25,
        marginBottom: 20
    },
    wrapper: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }
});
