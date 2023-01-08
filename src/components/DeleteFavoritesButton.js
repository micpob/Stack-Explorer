import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../utils/colors'

const MainContainer = styled.View`
`

const StyledDeleteFavoritesButton = styled.TouchableOpacity`
  
`
const DeleteFavoritesButton = ({deleteFavorites, setDeleteFavorites}) => {

  const handleClick = () => {    
    setDeleteFavorites(!deleteFavorites)
  }
  
  return (
    <MainContainer >
      <StyledDeleteFavoritesButton onPress={handleClick} >
        { deleteFavorites ?
          <FontAwesome name="trash" size={32} color={colors.deleteMain} />
          :
          <FontAwesome name="trash-o" size={32} color="white" />
        }  
      </StyledDeleteFavoritesButton>
    </MainContainer>
  )
}

export default DeleteFavoritesButton
