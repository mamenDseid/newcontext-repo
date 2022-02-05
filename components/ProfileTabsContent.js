import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
    Text, View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    Image
} from 'react-native';
import Constants from 'expo-constants';
import { CredentialsContext } from './CredentialsContext';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import useGetuserDetail from '../hooks/useGetuserDetail';

function HomeGrid({ feeds }) {
    return (
        <View>
            {feeds.length === 0 ? (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text>No feeds yet </Text>
                </View>
            ) : (
                <>
                    <FlatList data={feeds} numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Image style={{ width: 100, height: 100, margin: 5 }} source={{ uri: `${item.data.image}` }} />
                            </TouchableOpacity>

                        )}

                    />

                </>
            )}

        </View>
    )
}

function HomeItem() {
    return (
        <View>
            <Text> Home item content </Text>
        </View>
    )
}

function SavedGrid() {
    return (
        <View>
            <Text>saved item</Text>
        </View>
    )
}

function TaggdItem() {
    return (
        <View>
            <Text>tagged item</Text>
        </View>
    )
}

export default function ProfileTabsContent({ userId }) {
    const [toggletab, setToggle] = useState(0)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const [thefeeds, setThefeeds]= useState([])
    const { userName, email, lastSeen, profilePic, uid, uniName } = storedCredentials
    const [savedPosts, setSavedPosts] = useState([])
    const isTrue = userId === uid;
    const { feeds, follow, following } = useGetuserDetail(userId)

    const tabtoogle = (index) => {
        setToggle(index)
    }
    const getSavePosts = useCallback(() => {
        const q = query(collection(db, "users", uid, "savedposts"));
        onSnapshot(q, (querySnap) => {
            setSavedPosts(querySnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data()
                };
            }))
        })
    }, [])
    useEffect(() => {
        if (isTrue) {
            getSavePosts()
        }


    }, [])

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
                <TouchableOpacity onPress={() => tabtoogle(0)} style={{ padding: 5 }}>
                    <Feather name="grid" size={24} style={toggletab === 0 ? styles.active : styles.default} />

                </TouchableOpacity>

                <TouchableOpacity onPress={() => tabtoogle(1)} style={{ padding: 5 }}>
                    <MaterialIcons name="view-carousel" size={28} style={toggletab === 1 ? styles.active : styles.default} />

                </TouchableOpacity>

                {isTrue && (<TouchableOpacity onPress={() => tabtoogle(2)} style={{ padding: 5 }}>

                    <FontAwesome name="bookmark" size={24} style={toggletab === 2 ? styles.active : styles.default} />


                </TouchableOpacity>)}



                <TouchableOpacity onPress={() => tabtoogle(3)} style={{ padding: 5 }}>
                    <Ionicons name="person-circle-outline" size={28} style={toggletab === 3 ? styles.active : styles.default} />

                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
                {toggletab === 0 ? <HomeGrid feeds={thefeeds} /> : toggletab === 1 ? <HomeItem /> : toggletab === 2 ? <SavedGrid /> : <TaggdItem />}

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
