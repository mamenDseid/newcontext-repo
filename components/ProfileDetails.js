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

export default function ProfileDetails() {
  return (
    <View style={styles.conte}>
         <View style={styles.wrapper}>


         </View>
    </View>
  );
}

const styles = StyleSheet.create({
    conte: {
        marginTop: 25
    },
    wrapper: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }
});
