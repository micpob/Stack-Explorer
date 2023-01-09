import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  width: 25%;
`

const StyledButton = styled.TouchableOpacity`
  padding: 4px
`

const FavoritesButton = ({setLastScreen, showSettingsView, setShowSettingsView, randomUrl, starred, setStarred, showLoader, setShowLoader, setFavorites, showFavoritesView, setShowFavoritesView, currentSite, setDisableStarbutton, disableStarButton}) => {
  
  const handleClick = async () => {
    if (showSettingsView) {
      setShowLoader(false)
      setShowSettingsView(false)
      setStarred(false)
      setLastScreen('settings')
      setShowFavoritesView(true)
    } else if (!showLoader && !showSettingsView && !showFavoritesView && randomUrl.length > 0) {S
      if (typeof currentSite.url == 'undefined') {  return }
      let storedFavorites = await AsyncStorage.getItem(`favorites`)
      setDisableStarbutton(true)
      if (starred) {
        setStarred(false)
        if (storedFavorites && storedFavorites.length > 0) {
          storedFavorites = JSON.parse(storedFavorites)
          const newFavoritesArray = storedFavorites.filter(favorite => favorite.url !== currentSite.url)
          const jsonNewFavoritesArray = JSON.stringify(newFavoritesArray)
          await AsyncStorage.setItem(`favorites`, jsonNewFavoritesArray)
          setFavorites(newFavoritesArray)
          setDisableStarbutton(false)
        }
      } else {
        setStarred(true)
        if (storedFavorites && storedFavorites.length > 0) {
          storedFavorites = JSON.parse(storedFavorites)
          if (storedFavorites.includes(currentSite)) {
            setDisableStarbutton(false)
          } else {
            const newFavoritesArray = [...storedFavorites, currentSite]
            const jsonNewFavoritesArray = JSON.stringify(newFavoritesArray)
            await AsyncStorage.setItem(`favorites`, jsonNewFavoritesArray)
            setFavorites(newFavoritesArray)
            setDisableStarbutton(false)
          }
        } else {
          const newFavoritesArray = [currentSite]
          const jsonNewFavoritesArray = JSON.stringify(newFavoritesArray)
          await AsyncStorage.setItem(`favorites`, jsonNewFavoritesArray)
          setFavorites(newFavoritesArray)
          setDisableStarbutton(false)
        }
      }
    }
  }

  const handleLongClick = async () => {
    setShowLoader(false)
    setShowSettingsView(false)
    setStarred(false)
    setLastScreen(showSettingsView? 'settings' : 'browser')
    setShowFavoritesView(true)
  }
  
  return (
    <MainContainer>
      <StyledButton onPress={ handleClick } onLongPress={ handleLongClick } delayLongPress={ 1000 } disabled={disableStarButton}>
        {starred && !showLoader && !showSettingsView && randomUrl.length ? <AntDesign name="star" size={36} color="gold" /> : <AntDesign name="star" size={36} color={colors.buttonsBarIcons} />}
      </StyledButton>
    </MainContainer>  
  )
}

export default FavoritesButton