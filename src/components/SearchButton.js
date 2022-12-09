import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  max-width: 50%;
  margin-top: 30px;
  background: green;
  border: 2px solid black;
  border-radius: 6px;
  padding: 7px;
`

const StyledSearchButton = styled.TouchableOpacity`
  
`

const StyledTextButton = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 600;
`

const SearchButton = ({setShowLoader, setShowAlert, tags, setRandomUrl, lastUrl, setLastUrl, links, setLinks}) => {
  
  let tagsForUrl = tags.join(';')
  const [page, setPage] = useState(20)
  const firstTimeRender = useRef(true)

  useEffect(() => {
    if ( firstTimeRender.current ) {
      return () => {
        firstTimeRender.current = false
      }
    }
    handleClick()
  }, [page])

  const handleClick = async () => {
    setShowAlert(false)

    printAsyncStorage()
    console.log('links:', links)
    console.log('page:', page)

    let fetchUrl = `https://api.stackexchange.com/2.3/search/advanced?pagesize=5&fromdate=946684800&order=desc&sort=activity&accepted=True&views=50&site=stackoverflow&filter=!0ynczPwaq3R_qM75&page=${page}&tagged=${tagsForUrl}`
    //let fetchUrl = `https://api.stackexchange.com/2.3/search/advanced?pagesize=5&fromdate=946684800&order=desc&sort=activity&accepted=True&views=50&site=stackoverflow&filter=!0ynczPwaq3R_qM75&tagged=${tagsForUrl}&page=${page}`
    
    if (lastUrl === fetchUrl && links.length > 0) {
      openRandomLink(fetchUrl, links)
    } else {
      const keys = await AsyncStorage.getAllKeys()

      const tagsArray = keys.map(key => {
          let n = key.lastIndexOf('=')
          return key.substring(n + 1)
      })

      if (tagsArray.includes(tagsForUrl)) {
        const fetchUrlIndex = tagsArray.indexOf(tagsForUrl)
        const key = keys[fetchUrlIndex]
        let linksFromStorage = await AsyncStorage.getItem(key)
        linksFromStorage = JSON.parse(linksFromStorage)
        console.log('links from storage:', linksFromStorage)
        if (linksFromStorage.length > 0) {
          openRandomLink(fetchUrl, linksFromStorage)  
        } else {
          console.log('change page in fetch URL')
          const newPage = page + 1
          setPage(newPage)
        }
      } else {
        setShowLoader(true)
        fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
          console.log('data:', data)
          if (typeof data.items == 'undefined') { console.log('data.items undefined'); setPage(1); return}
          if (data.items.length === 0) {
            if (page !== 1) {
              console.log('reset page to 1')
              setPage(1)
            } else {
              setShowLoader(false)
              setShowAlert(true)
              console.log('there are no results with the selected tags ')
              //alert('there are no results with the selected tags ')
            }
          } else {
            const linksArray = data.items.map(item => item.link)
            //console.log('links:', linksArray)
            openRandomLink(fetchUrl, linksArray)
          }
        })
      }
  }
 }
  
  const openRandomLink = async (fetchUrl, linksArray) => {
    const questionUrl = linksArray[Math.floor(Math.random()*linksArray.length)]
    console.log('questionUrl:', questionUrl)
    setShowLoader(false)
    setRandomUrl(questionUrl)
    const newLinksArray = linksArray.filter(link => link !== questionUrl)
    const jsonNewLinksArray = JSON.stringify(newLinksArray)
    AsyncStorage.setItem(fetchUrl, jsonNewLinksArray)
    setLinks(newLinksArray)
    setLastUrl(fetchUrl)
    /* if (newLinksArray.length === 0) {
      console.log('change page in fetch URL')
      const newPage = page + 1
      setPage(newPage)
    } */

    //DEV
    let newLinksArrayStored = await AsyncStorage.getItem(fetchUrl)
    newLinksArrayStored = JSON.parse(newLinksArrayStored)
    console.log('newLinksArrayStored:', newLinksArrayStored)
    console.info(new Blob([JSON.stringify(newLinksArrayStored)]).size)
  }

  const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        let asyncStorage = {}
        stores.map((result, i, store) => {
          asyncStorage[store[i][0]] = store[i][1]
        });
        console.table(asyncStorage)
      });
    });
  };

  return (
    <MainContainer>
      <StyledSearchButton onPress={handleClick}>
        <StyledTextButton>SEARCH</StyledTextButton>
      </StyledSearchButton>
    </MainContainer>  
  )
}

export default SearchButton