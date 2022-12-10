import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, StyleSheet, Text, View, Platform, SafeAreaView, Button } from 'react-native'
import styled from 'styled-components/native'
import SearchButton from './src/components/SearchButton'
import FavoritesButton from './src/components/FavoritesButton'
import { WebView } from 'react-native-webview'
import React, { Component, useState, useRef, useEffect } from 'react'
import AnimatedLoader from 'react-native-animated-loader'
import reactDom from 'react-dom'
import AsyncStorage from '@react-native-async-storage/async-storage';



const MainContainer = styled.View`
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
`
const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 30px;
  align-items: center;
  justify-content: space-around;
  margin-top: auto;
  padding: 20px 5px 20px 5px;
`
const LoaderContainer = styled.View`
  margin: auto;
`
export default function App() {

  //console.log('App started')

  const [showCategoriesView, setShowCategoriesView] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [showWebview, setShowWebview] = useState(true)
  const [tags, setTags] = useState(['inkscape'])
  const [lastUrl, setLastUrl] = useState('')
  const [links, setLinks] = useState([])
  const [randomUrl, setRandomUrl] = useState('')
  //const [page, setPage] = useState(1)
  const styles = StyleSheet.create({
    lottie: {
      backgroundColor: 'red',
      width: 300,
      height: 300,
    },
  })

  11

  return (

    <MainContainer>
      
       
      
      
      {/* {showCategoriesView && 
        <CategoriesView></CategoriesView>
      } */}

      {showLoader ? 
      <LoaderContainer>
        <ActivityIndicator size="large" color="blue" />
      </LoaderContainer>
        :
        null
      }


      {!showLoader && !showCategoriesView && randomUrl.length > 0 ?  
        (
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: randomUrl }}
              style={{marginTop: 22, flex: 1}}
            />
          </View>
        ) : null
      }
      {/* {!showCategoriesView && randomUrl.length > 0 ?  Platform.OS === "web"  ? (
          <iframe src={{ uri: randomUrl }} height={'100%'} width={'100%'} />
        ) : (
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: randomUrl }}
              style={{marginTop: 22, flex: 1}}
            />
          </View>
        ) : null
      } */}


      <ButtonsContainer>
        <Button title="DEL" onPress={() => { AsyncStorage.clear(); const keys = AsyncStorage.getAllKeys(); console.log('keys:', keys)}}></Button>
        <SearchButton setShowLoader={setShowLoader} setShowAlert={setShowAlert} tags={tags} lastUrl={lastUrl} setLastUrl={setLastUrl} links={links} setLinks={setLinks} setRandomUrl={setRandomUrl}></SearchButton>
        {/* <FavoritesButton></FavoritesButton> */}
      </ButtonsContainer>
      {/* <StatusBar style="auto" /> */}
    </MainContainer>
  )
}

