import React, { useState, useRef, useEffect } from 'react'
import {View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../utils/colors'

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  width: 25%;
`

const StyledButton = styled.TouchableOpacity`
  padding: 4px
`

const ShowSettingsButton = ({setLastScreen, showFavoritesView, setShowSettingsView, showSettingsView, setStarred, setShowFavoritesView}) => {
  
  const handleClick = async () => {
    if (showSettingsView) return
    setStarred(false)
    setLastScreen(showFavoritesView ? 'favorites' : 'browser')
    setShowFavoritesView(false)
    setShowSettingsView(true)
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