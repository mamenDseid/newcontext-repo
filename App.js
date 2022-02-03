import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import RootNavigation from './screens/RootNavigation';

 

 const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>

       <RootNavigation />

     </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
