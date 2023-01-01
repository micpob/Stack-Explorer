import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import {View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import colors from '../utils/colors'

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  width: 25%;
`

const StyledButton = styled.TouchableOpacity`
  
`

const ShowSettingsButton = ({setShowSettingsView, showSettingsView, randomUrl, setStarred}) => {
  
  const handleClick = async () => {
    setStarred(false)
    randomUrl.length > 0 ? setShowSettingsView(!showSettingsView) : setShowSettingsView(true)
  }
  
  return (
    <MainContainer>
      <StyledButton onPress={handleClick}>
        <Ionicons name="settings" size={36} color={colors.buttonsBarIcons} />
      </StyledButton>
    </MainContainer>  
  )
}

export default ShowSettingsButton