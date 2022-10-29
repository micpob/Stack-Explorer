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
  

  /* const openRandomLink = (linksArray) => {
    const randomNumber = Math.floor(Math.random() * (linksArray.length - 1))
    const questionUrl = linksArray[randomNumber]
    window.open(questionUrl, '_blank').focus()
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
