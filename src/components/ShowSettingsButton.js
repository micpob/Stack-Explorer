import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import colors from '../utils/colors'

/* const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  background: orange;
  border: 2px solid black;
  border-radius: 6px;
  padding: 7px;
` */
const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  width: 25%;
`

const StyledButton = styled.TouchableOpacity`
  
`

/* const StyledTextButton = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 600;
` */

const ShowSettingsButton = ({setShowSettingsView, showSettingsView, randomUrl, setStarred}) => {
  
  const handleClick = async () => {
    setStarred(false)
    randomUrl.length > 0 ? setShowSettingsView(!showSettingsView) : setShowSettingsView(true)
  }
  
  return (
    <MainContainer>
      <StyledButton onPress={handleClick}>
        {/* <Ionicons name="settings-outline" size={36} color="gray" /> */}
        <Ionicons name="settings" size={36} color={colors.buttonsBarIcons} />
        {/* <AntDesign name="setting" size={36} color="black" /> */}
      </StyledButton>
      {/* <StyledTagsButton onPress={handleClick}>
        <StyledTextButton>TAGS</StyledTextButton>
      </StyledTagsButton> */}
    </MainContainer>  
  )
}

export default ShowSettingsButton