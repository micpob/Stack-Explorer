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

const SearchButton = ({setShowLoader, tags, lastUrl, setLastUrl, links, setLinks, setRandomUrl}) => {
  
  let tagsForUrl = tags.join(';')
  const [page, setPage] = useState(1)
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
    console.log('page:', page)
    //const fetchUrl = `https://api.stackexchange.com/2.3/search/advanced?pagesize=10&fromdate=946684800&order=desc&sort=activity&accepted=True&tagged=${tagsForUrl}&views=50&site=stackoverflow`
    //let fetchUrl = `https://api.stackexchange.com/2.3/search/advanced?page=${page}&pagesize=100&fromdate=946684800&order=desc&sort=activity&accepted=True&tagged=${tagsForUrl}&views=50&site=stackoverflow&filter=!-MJX1_ZwORBEZ4ki2)9Un9Jkk2*tr)q*I`
    let fetchUrl = `https://api.stackexchange.com/2.3/search/advanced?page=${page}&pagesize=10&fromdate=946684800&order=desc&sort=activity&accepted=True&tagged=${tagsForUrl}&views=50&site=stackoverflow&filter=!0ynczPwaq3R_qM75`
    
    const keys = await AsyncStorage.getAllKeys()

    if (keys.includes(fetchUrl)) {
      let links = await AsyncStorage.getItem(fetchUrl)
      links = JSON.parse(links)
      console.log('links from storage:', links)
      if (links.length > 0) {
        openRandomLink(fetchUrl, links)  
      } else if (page !== 1) {
        console.log('reset page to 1')
        setPage(1)
      } else {
        setShowLoader(false)
        console.log('there are no results with the selected tags ')
      }
    } else {
      setShowLoader(true)
      fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
      console.log('data:', data)
      if (typeof data.items == 'undefined') { console.log('data.items undefined'); return}
      if (data.items.length === 0) {
        if (page !== 1) {
          console.log('reset page to 1')
          setPage(1)
        } else {
          setShowLoader(false)
          console.log('there are no results with the selected tags ')
          //alert('there are no results with the selected tags ')
        }
      } else {
        const linksArray = data.items.map(item => item.link)
        //console.log('links:', linksArray)
        
        //setLinks(linksArray)
        //setLastUrl(fetchUrl)
        openRandomLink(fetchUrl, linksArray)  
      }
    })
  }
 }
  
  const openRandomLink = async (fetchUrl, linksArray) => {
    const questionUrl = linksArray[Math.floor(Math.random()*linksArray.length)]
    const newLinksArray = linksArray.filter(link => link !== questionUrl)
    //setLinks(newLinksArray)
    const jsonNewLinksArray = JSON.stringify(newLinksArray)
    
     const waiting = await AsyncStorage.setItem(fetchUrl, jsonNewLinksArray)
    if (newLinksArray.length === 0) {
      console.log('change page in fetch URL')
      const newPage = page + 1
      setPage(newPage)
    }
    setShowLoader(false)
    setRandomUrl(questionUrl)
    let newLinksArrayStored = await AsyncStorage.getItem(fetchUrl)
    newLinksArrayStored = JSON.parse(newLinksArrayStored)
    console.log('newLinksArrayStored:', newLinksArrayStored)
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