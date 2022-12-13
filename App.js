import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, StyleSheet, Text, View, Platform, SafeAreaView, Button } from 'react-native'
import styled from 'styled-components/native'
import SearchButton from './src/components/SearchButton'
import FavoritesButton from './Deposit/FavoritesButton'
import { WebView } from 'react-native-webview'
import React, { Component, useState, useRef, useEffect } from 'react'
import reactDom from 'react-dom'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from 'react-native-progress/Bar'
import TagsView from './src/components/TagsView'
import ShowTagsButton from './src/components/ShowTagsButton'


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
  align-items: center;
  justify-content: space-around;
  padding: 20px 0px 20px 0px;
`
const LoaderContainer = styled.View`
  margin: auto;
`

const ProgressBarcontainer = styled.View`
  heigth: 5px;
  margin-top: auto;
`
export default function App() {

  const [showTagsView, setShowTagsView] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showWebview, setShowWebview] = useState(true)
  const [tags, setTags] = useState(['vba'])
  //const [tags, setTags] = useState(['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'PHP', 'SQL', 'MySql'])
  const [lastUrl, setLastUrl] = useState('')
  const [links, setLinks] = useState([])
  const [randomUrl, setRandomUrl] = useState('')
  //const [page, setPage] = useState(1)



  return (

    <MainContainer>
      

      { 
        showTagsView &&
        <TagsView></TagsView>
      }
       
      {
        showLoader && 
        <LoaderContainer>
          <ActivityIndicator size="large" color="blue" />
        </LoaderContainer> 
      }

      {
        showAlert && 
        <LoaderContainer>
          <Text>There are no results with the selected tags</Text>
        </LoaderContainer> 
      } 


      {!showLoader && !showAlert && !showTagsView && randomUrl.length > 0 ?  
        (
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: randomUrl }}
              style={{marginTop: 22, flex: 1}}
            />
          </View>
        ) : null
      }
      
      <ProgressBarcontainer>
        { showLoader && <ProgressBar animationConfig={{ bounciness: 0 }} progress={0} width={null} indeterminate={true} color='orange' indeterminateAnimationDuration={3000} borderWidth={0} borderColor='black' borderRadius={0} marginTop='auto' /> }
      </ProgressBarcontainer>

      <ButtonsContainer>
        <ShowTagsButton setShowAlert={setShowAlert} setShowTagsView={setShowTagsView}></ShowTagsButton>
        <SearchButton setShowTagsView={setShowTagsView} setShowLoader={setShowLoader} setShowAlert={setShowAlert} tags={tags} lastUrl={lastUrl} setLastUrl={setLastUrl} links={links} setLinks={setLinks} setRandomUrl={setRandomUrl}></SearchButton>
        <Button title="DEL" onPress={() => { AsyncStorage.clear(); const keys = AsyncStorage.getAllKeys(); console.log('keys:', keys)}}></Button>
      </ButtonsContainer>
    </MainContainer>
  )
}

