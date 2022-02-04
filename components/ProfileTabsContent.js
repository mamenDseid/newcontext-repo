import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import { Tab, TabView } from 'react-native-elements';
import { CredentialsContext } from './CredentialsContext';



export default function ProfileTabsContent({ userId, feeds }) {
    const [index, setIndex] = useState(0)
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const { userName, email, lastSeen, profilePic, uid, uniName } = storedCredentials
    console.log(feeds);

    const isTrue = userId === uid
    return (
        <>
        <View style={styles.conte}>

            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: '#F5F5F5',
                    height: 3,
                }}
                variant="#F5F5F5"
            >
                <Tab.Item

                    titleStyle={{ fontSize: 12 }}

                    icon={{ name: 'grid-view', type: 'materialIcons', color: 'black' }}
                />
                <Tab.Item

                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'view-carousel', type: 'materialIcons', color: 'black' }}
                />
                <Tab.Item

                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: "bookmark", type: 'fontawsome', color: 'black' }}
                />

                <Tab.Item

                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: "person-circle", type: 'ionicon', color: 'black' }}
                />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">

                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                    <Text h1>Recent</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                    <Text h1>Cart</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                    <Text h1>Cart</Text>
                </TabView.Item>


            </TabView>
        </View>
        </>
    )
}

const styles = StyleSheet.create({

    conte: {
        marginTop: 25
    }
});