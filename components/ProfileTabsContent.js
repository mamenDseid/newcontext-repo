import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Tab, TabView } from 'react-native-elements';



export default function ProfileTabsContent() {
    const [index, setIndex] = useState(0)

//<Ionicons name="person-circle" size={24} color="black" />
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
        </View>
    )
}

const styles = StyleSheet.create({

    conte: {
        marginTop: 25
    }
});