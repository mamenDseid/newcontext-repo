import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { CredentialsContext } from './CredentialsContext';
import React, { useContext, useState, useEffect } from 'react';
import useGetuserDetail from '../hooks/useGetuserDetail';
import ProfileTabsContent from './ProfileTabsContent';
import TabViewNav from './TabViewNav';

export default function ProfileDetails({ userId, username }) {
    const { feeds, follow, following } = useGetuserDetail(userId)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const { userName, email, lastSeen, profilePic, uid, uniName } = storedCredentials
    const [thefeeds, setThefeeds]= useState([])

    const isTrue = userId === uid;
    useEffect(()=> {
        const feedRef = query(collection(db, "feeds"), where("uid" ,"==" ,userId))

        onSnapshot(feedRef, (querySnap)=> {
            setThefeeds(querySnap.docs.map((doc)=> {
                return {
                    id: doc.id,
                    data: doc.data()
                  };
            }))
        })

    },[userId])
    return (
        <>
        <View style={styles.conte}>
            <View style={styles.wrapper}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {thefeeds.length}
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
