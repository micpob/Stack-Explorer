import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button } from 'react-native';


import { WebView } from 'react-native-webview';

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  margin-top: 100px;
  
`

const StyledSearchButton = styled.Button`
  font-size: 4em;
  padding: 0.2em;
  background: green;
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  color: white;
`
const SearchButton = ({setShowWebview, showWebview}) => {
  const handleClick = () => {
    //console.log('handleclick')

    setShowWebview(!showWebview)

  }
  

    //const fetchUrl = `https://api.stackexchange.com/2.3/search/advanced?pagesize=10&fromdate=946684800&order=desc&sort=activity&accepted=True&tagged=${tagsForUrl}&views=50&site=stackoverflow`
    //let fetchUrl = `https://api.stackexchange.com/2.3/search/advanced?page=${page}&pagesize=100&fromdate=946684800&order=desc&sort=activity&accepted=True&tagged=${tagsForUrl}&views=50&site=stackoverflow&filter=!-MJX1_ZwORBEZ4ki2)9Un9Jkk2*tr)q*I`
    let fetchUrl = `https://api.stackexchange.com/2.3/search/advanced?page=${page}&pagesize=100&fromdate=946684800&order=desc&sort=activity&accepted=True&tagged=${tagsForUrl}&views=50&site=stackoverflow&filter=!0ynczPwaq3R_qM75`
    console.log('fetchUrl:', fetchUrl)
    const newLinksArray = linksArray.filter(link => link !== questionUrl)
    setLinks(newLinksArray)
    console.log(`links:`, newLinksArray)
  } */

  return (
    <MainContainer>
      <StyledSearchButton onPress={handleClick} title="SEARCH">
        
      </StyledSearchButton>
    </MainContainer>
  )
}

export default SearchButton
