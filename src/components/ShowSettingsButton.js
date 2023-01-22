import React from 'react'
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
  padding: 6px;
`

const ShowSettingsButton = ({setDisableStarbutton, setLastScreen, showFavoritesView, setShowSettingsView, showSettingsView, setStarred, setShowFavoritesView}) => {
  
  const handleClick = async () => {
    if (showSettingsView) return
    setStarred(false)
    setLastScreen(showFavoritesView ? 'favorites' : 'browser')
    setShowFavoritesView(false)
    setShowSettingsView(true)
    setDisableStarbutton(false)
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