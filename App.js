import { StyleSheet, Text, View } from 'react-native';
import React,{useState} from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigation from './screens/RootNavigation';

 import AppLoading from "expo-app-loading"

 const queryClient = new QueryClient()

export default function App() {
 const [appReady, setAppReady] = useState(false)
 const [storedCredentials, setStoredCredentials]=useState('')
 const checkLoginCredentials = ()=> {
 AsyncStorage.getItem('user').then((result)=> {
 if(result !== null){
 setStoredCredentials(JSON.parse(result))
 }else {
 setStoredCredentials(null)
 }
 }).catch(error => console.log("error"))
 }
 if(!appReady){
  return(
  <AppLoading
   startAsync={checkLoginCredentials}
 onFinish={()=> setAppReady(true)}
onError={console.warn}
   
   />
  )
 }
  return (
    <QueryClientProvider client={queryClient}>

       <RootNavigation />

     </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
