import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  background: orange;
  border: 2px solid black;
  border-radius: 6px;
  padding: 7px;
`

const StyledTagsButton = styled.TouchableOpacity`
  
`

const StyledTextButton = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 600;
`

const ShowSettingsButton = ({setShowAlert, setShowSettingsView}) => {
  
  const handleClick = async () => {
    setShowAlert(false)
    setShowSettingsView(true)
  }
  
  return (
    <MainContainer>
      <StyledTagsButton onPress={handleClick}>
        <StyledTextButton>TAGS</StyledTextButton>
      </StyledTagsButton>
    </MainContainer>  
  )
}

export default ShowSettingsButton