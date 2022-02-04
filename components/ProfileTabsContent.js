import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Tab, TabView } from 'react-native-elements';



export default function ProfileTabsContent() {
    const [index, setIndex] = useState(0)


    return (
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

                    icon={{ name: 'dashboard', type: 'materialIcons', color: 'black' }}
                />
                <Tab.Item
                    
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'heart', type: 'ionicon', color: 'black' }}
                />
                <Tab.Item
                    
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'cart', type: 'ionicon', color: 'black' }}
                />
            </Tab>
        </View>
    )
}

const styles = StyleSheet.create({

    conte: {
        marginTop: 25
    }
});