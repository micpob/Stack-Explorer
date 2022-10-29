import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, SafeAreaView, Button } from 'react-native';
import styled from 'styled-components/native';
import SearchButton from './src/components/SearchButton';
import { WebView } from 'react-native-webview';
import React, { Component, useState, useRef, useEffect } from 'react'

const MainContainer = styled.View`
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
`
export default function App() {

  const [showWebview, setShowWebview] = useState(false)

  return (

    <MainContainer>
      <SearchButton setShowWebview={setShowWebview} showWebview={showWebview} ></SearchButton>
      
      {showWebview ?  Platform.OS === "web"  ? (
          <iframe src="https://stackoverflow.com/" height={'100%'} width={'100%'} />
        ) : (
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: "https://stackoverflow.com/" }}
              style={{marginTop: 22, flex: 1}}
            />
          </View>
        ) : null
      }
      {/* <WebView
              source={{ uri: "https://reactnative.dev/" }}
              style={{height: '40%', backgroundColor: 'green'}}
            /> */}
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <SearchButton setShowWebview={setShowWebview} showWebview={showWebview}></SearchButton> */}
      {/* <WebView
              source={{ uri: "https://reactnative.dev/" }}
              style={{marginTop: 22, flex: 1}}
            /> */}
     
      {/* { Platform.OS === "web" && showWebview ? (
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