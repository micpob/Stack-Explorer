import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, SafeAreaView, Button } from 'react-native';
import styled from 'styled-components/native';
import SearchButton from './src/components/SearchButton';
import CategoriesView from './src/components/CategoriesView';
import { WebView } from 'react-native-webview';
import React, { Component, useState, useRef, useEffect } from 'react'


const MainContainer = styled.View`
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
`
export default function App() {

  console.log('App started')

  const [showCategoriesView, setShowCategoriesView] = useState(true)
  const [showWebview, setShowWebview] = useState(true)
  const [tags, setTags] = useState([])
  const [lastUrl, setLastUrl] = useState('')

  return (

    <MainContainer>
      <SearchButton setShowWebview={setShowWebview} showWebview={showWebview} ></SearchButton>
      
      {showCategoriesView && 
        <CategoriesView></CategoriesView>
      }

     
      {/* {!showCategoriesView && randomUrl.length > 0 ?  Platform.OS === "web"  ? (
          <iframe src="https://micpob.com/" height={'100%'} width={'100%'} />
        ) : (
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: "https://micpob.com/" }}
              style={{marginTop: 22, flex: 1}}
            />
          </View>
        )
      } */}
    
      
      <StatusBar style="auto" />
    </MainContainer>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */