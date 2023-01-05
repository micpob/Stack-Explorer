import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo"
import colors from '../utils/colors'

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

const SearchButton = ({setShowSettingsView, setShowLoader, year, site, tags, setRandomUrl, lastFetchUrl, setlastFetchUrl, links, setLinks, orOperator, setStarred, setShowFavoritesView, setCurrentSite, setDisableStarbutton}) => {

  const handleClick = async () => {
    //console.log('handleClick()')
    setDisableStarbutton(true)
    setCurrentSite({})
    setShowFavoritesView(false)
    setShowSettingsView(false)
    setStarred(false)
    let fetchUrlBase = `https://api.stackexchange.com/2.3/search/advanced?pagesize=100&fromdate=${year}&order=desc&sort=activity&accepted=True&views=50&site=${site}&filter=!0ynczPwaq3R_qM75`
    let fetchUrlTags = tags.length < 1 ? '' : orOperator ? `&q=${encodeURIComponent(tags.map(element => `[${element}]`).join(' or '))}` : `&q=${encodeURIComponent(tags.map(element => `[${element}]`).join(''))}` 
    let fetchUrl = fetchUrlBase + fetchUrlTags + `&page=`
    //console.log('FETCH URL:', fetchUrl)

    if (lastFetchUrl.includes(fetchUrl) && links.length > 0) {
      //console.log('lastFetchUrl === fetchUrl && links.length > 0')
      openRandomLink(lastFetchUrl, links)
    } else {
      const keys = await AsyncStorage.getAllKeys()
      const urlAlreadyStored = keys.findIndex(key => key.includes(fetchUrl))

      if (urlAlreadyStored === -1) {
        fetchUrl = fetchUrl + '1'
        //console.log('URL not already stored:', fetchUrl)
        fetchMoreLinks(fetchUrl)
      } else {
        const key = keys[urlAlreadyStored]
        //console.log('url already stored:', key)
        let linksFromStorage = await AsyncStorage.getItem(key)
        linksFromStorage = JSON.parse(linksFromStorage)
        //console.log('links from storage:', linksFromStorage)
        if (linksFromStorage.length > 0) {
          //console.log('urlAlreadyStored - linksFromStorage.length > 0')
          openRandomLink(key, linksFromStorage)  
        } else {
          const removeEmptyArray = await AsyncStorage.removeItem(key)
          //console.log('urlAlreadyStored but empty links array - change page in fetch URL')
          const pageFromUrl = key.substring(key.lastIndexOf('=') + 1)
          const newPage = parseInt(pageFromUrl) + 1
          //console.log('newPage = parseInt(pageFromUrl) + 1:', newPage)
          let newfetchUrl = fetchUrlBase + fetchUrlTags + `&page=${newPage}`
          //console.log('fetchMoreLinks(newfetchUrl)')
          fetchMoreLinks(newfetchUrl)
        }
      }
  }
 }

  const fetchMoreLinks = (fetchUrl) => {
    setShowLoader(true)
    fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
      let pageFromUrl = fetchUrl.substring(fetchUrl.lastIndexOf('=') + 1)
      pageFromUrl = parseInt(pageFromUrl)
      //console.log('fetchUrl::', fetchUrl)
      //console.log('data:', data)
      if (typeof data.items == 'undefined') { 
        //console.log('data.items undefined'); 
        let newfetchUrl = fetchUrl.substring(0, fetchUrl.lastIndexOf('=') + 1) + '1'
        //console.log('newfetchUrl:', newfetchUrl)
        fetchMoreLinks(newfetchUrl)
        return
      }
      if (data.items.length === 0) {
        if (pageFromUrl !== 1) {
          //console.log('reset page to 1 from FetchMoreLinks')
          let newfetchUrl =  fetchUrl.substring(0, fetchUrl.lastIndexOf('=') + 1) + '1'
          //console.log('newfetchUrl:', newfetchUrl)
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
    //console.log('linksArray from openRandomLink:', linksArray)
    //console.log('fetchUrl from openRandomLink:', fetchUrl)
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
      //console.log('questionUrl:', questionUrl)
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
      <StyledSearchButton onPress={handleClick}>
        <StyledTextButton>SEARCH</StyledTextButton>
      </StyledSearchButton>
    </MainContainer>  
  )
}

export default SearchButton