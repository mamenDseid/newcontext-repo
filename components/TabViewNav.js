import React from 'react';
import { Tab, Text, TabView } from 'react-native-elements';



export default () => {
    const [index, setIndex] = React.useState(0);

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
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                    <Text h1>Recent</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'black', width: '100%' }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                    <Text h1>Cart</Text>
                </TabView.Item>
            </TabView>
        </>
    );
};