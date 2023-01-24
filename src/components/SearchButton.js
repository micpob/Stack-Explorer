import React, { Component, useState, useRef, useEffect } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo"
import colors from '../utils/colors'
import keys from '../utils/keys'

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  width: 50%;
  border-radius: 4px;
  padding: 7px;
`

const StyledSearchButton = styled.TouchableOpacity`
  border-radius: 4px;
  padding: 8px;
  background: ${colors.primary};
`

const StyledTextButton = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
`

const SearchButton = ({buttonOpacity, setButtonOpacity, showFavoritesView, setLastScreen, setShowSettingsView, setShowLoader, year, site, tags, setRandomUrl, links, setLinks, orOperator, setStarred, setShowFavoritesView, setCurrentSite, setDisableStarbutton}) => {

  const [lastFetchUrl, setlastFetchUrl] = useState('')

  const handleClick = async () => {
    setButtonOpacity(0.2)
    setLastScreen(showFavoritesView ? 'favorites' : 'settings')
    setDisableStarbutton(true)
    setCurrentSite({})
    setShowFavoritesView(false)
    setShowSettingsView(false)
    setStarred(false)
    let fetchUrlParameters = `pagesize=50&order=desc&sort=activity&accepted=True&views=25&fromdate=${year}&site=${site}&filter=!0ynczPwaq3R_qM75`
    let fetchUrlTags = tags.length < 1 ? '' : orOperator ? `&q=${encodeURIComponent(tags.map(element => `[${element}]`).join(' or '))}` : `&q=${encodeURIComponent(tags.map(element => `[${element}]`).join(''))}` 
    let fetchUrl = fetchUrlParameters + fetchUrlTags + `&page=`

    if (lastFetchUrl.includes(fetchUrl) && links.length > 0) {
      openRandomLink(lastFetchUrl, links)
    } else {
      const keys = await AsyncStorage.getAllKeys()
      const urlAlreadyStored = keys.findIndex(key => key.includes(fetchUrl))

      if (urlAlreadyStored === -1) {
        fetchUrl = fetchUrl + '1'
        fetchMoreLinks(fetchUrl)
      } else {
        const key = keys[urlAlreadyStored]
        let linksFromStorage = await AsyncStorage.getItem(key)
        linksFromStorage = JSON.parse(linksFromStorage)
        if (linksFromStorage.length > 0) {
          openRandomLink(key, linksFromStorage)  
        } else {
          const removeEmptyArray = await AsyncStorage.removeItem(key)
          const pageFromUrl = key.substring(key.lastIndexOf('=') + 1)
          const newPage = parseInt(pageFromUrl) + 1
          let newfetchUrl = fetchUrlParameters + fetchUrlTags + `&page=${newPage}`
          fetchMoreLinks(newfetchUrl)
        }
      }
  }
 }

  const fetchMoreLinks = (fetchUrl) => {
    const apiKey = keys.apyKey
    const fetchUrlBase = apiKey.length > 0 ? `https://api.stackexchange.com/2.3/search/advanced?key=${apiKey}&` : `https://api.stackexchange.com/2.3/search/advanced?`
    let fullFetchUrl = fetchUrlBase + fetchUrl
    setShowLoader(true)
    fetch(fullFetchUrl)
    .then(response => response.json())
    .then(data => {
      let pageFromUrl = fetchUrl.substring(fetchUrl.lastIndexOf('=') + 1)
      pageFromUrl = parseInt(pageFromUrl)
      if (typeof data.items == 'undefined') { 
        if (pageFromUrl === 1) {
          setShowLoader(false)
          Alert.alert(
            'Error: undefined result',
            `There seem to be some communication issues with the server.\nPlease try with another site or try again later.`,
            [ ],
            { cancelable: true }
          )
          setShowSettingsView(true)
        } else {
          let newfetchUrl = fetchUrl.substring(0, fetchUrl.lastIndexOf('=') + 1) + '1'
          fetchMoreLinks(newfetchUrl)
          return
        }
      }
      if (data.items.length === 0) {
        if (pageFromUrl !== 1) {
          let newfetchUrl =  fetchUrl.substring(0, fetchUrl.lastIndexOf('=') + 1) + '1'
          fetchMoreLinks(newfetchUrl)
        } else {
          setShowLoader(false)
          Alert.alert(
            'No results',
            `There are no results with the selected tags and start year. ${!orOperator && tags.length > 3 ? "\n\nWhile using the 'and' operator, please avoid selecting more than 3 tags at the same time." : "" }`,
            [ ],
            { cancelable: true }
          )
          setShowSettingsView(true)
        }
      } else {
        if (data.items.length < 25 && pageFromUrl === 1) {
          Alert.alert(
            'Very few results',
            `There are less than 25 results with the selected tags and start year.\n\nThis is just to alert you that you will soon start seeing the same questions repeated.`,
            [ ],
            { cancelable: true }
          )
        }
        const linksArray = data.items.map(item => item.link)
        openRandomLink(fetchUrl, linksArray)
      } 
    })
  }
  
  const openRandomLink = async (fetchUrl, linksArray) => {
    NetInfo.fetch().then(async (state) => {
      if (!state.isConnected) {
        Alert.alert(
          "No internet connection",
          `You need to be connected to the internet to use the app`,
          [ ],
          { cancelable: true }
        )
      } else {
      const questionUrl = linksArray[Math.floor(Math.random()*linksArray.length)]
      setShowLoader(false)
      setRandomUrl(questionUrl)
      const newLinksArray = linksArray.filter(link => link !== questionUrl)
      const jsonNewLinksArray = JSON.stringify(newLinksArray)
      AsyncStorage.setItem(fetchUrl, jsonNewLinksArray)
      setLinks(newLinksArray)
      setlastFetchUrl(fetchUrl)
      }
    })
  }

  return (
    <MainContainer>
      <StyledSearchButton onPress={handleClick} style={{opacity: buttonOpacity}}>
        <StyledTextButton>SEARCH</StyledTextButton>
      </StyledSearchButton>
    </MainContainer>  
  )
}

export default SearchButton