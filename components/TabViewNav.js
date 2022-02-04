import React, { useState, useContext } from 'react';
import { CredentialsContext } from './CredentialsContext';
import { Tab, Text, TabView } from 'react-native-elements';
import { View, Image, StatusBar, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"




    


export default ({ userId, feeds }) => {
    const [index, setIndex] = React.useState(0);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const { userName, email, lastSeen, profilePic, uid, uniName } = storedCredentials
    console.log(feeds);

    const isTrue = userId === uid

    function HomeItem(){
        return (
        <View>
     
      <FlatList  data={feeds} numColumns={3} renderItem={({ item})=> (
          <Image  style={{width: 100, height: 100, margin: 5}} source={{uri: `${item.data.image}`}} />
      )} />
        </View> 
     )}

    return (
        <>
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
                <TabView.Item style={{ backgroundColor: 'white', width: '100%', alignItems: "center" }}>
                    <HomeItem/>
                  
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>

   <TabView.Item style={{ backgroundColor: 'black', width: '100%' }}>
                    <Text h1>Bookmark</Text>
                </TabView.Item>  

               
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                    <Text h1>Cart</Text>
                </TabView.Item>
            </TabView>
        </>
    );
};