import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import defaultSites from '../utils/defaultSites'

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  align-self: center;
  width: 25%;
`

const StyledButton = styled.TouchableOpacity`
  
`

const FavoritesButton = ({showSettingsView, setShowSettingsView, randomUrl, starred, setStarred, showLoader, setShowLoader, setFavorites, setShowFavoritesView, currentSite}) => {
  
  const handleClick = async () => {
    if (!showLoader && !showSettingsView && randomUrl.length > 0) {
      let storedFavorites = await AsyncStorage.getItem(`favorites`)
      if (starred) {
        if (storedFavorites && storedFavorites.length > 0) {
          storedFavorites = JSON.parse(storedFavorites)
          const newFavoritesArray = storedFavorites.filter(favorite => favorite.url !== currentSite.url)
          const jsonNewFavoritesArray = JSON.stringify(newFavoritesArray)
          AsyncStorage.setItem(`favorites`, jsonNewFavoritesArray)
          setFavorites(newFavoritesArray)
          setStarred(false)
        } 
      } else {
        //const selectedSite = defaultSites['sites'].find(siteObJ => siteObJ.value === site)
        //const newFavorite = {url: randomUrl, site: selectedSite.name}
        if (storedFavorites && storedFavorites.length > 0) {
          storedFavorites = JSON.parse(storedFavorites)
          const newFavoritesArray = [...storedFavorites, currentSite]
          const jsonNewFavoritesArray = JSON.stringify(newFavoritesArray)
          AsyncStorage.setItem(`favorites`, jsonNewFavoritesArray)
          setFavorites(newFavoritesArray)
          setStarred(true)
        } else {
          const newFavoritesArray = [currentSite]
          const jsonNewFavoritesArray = JSON.stringify(newFavoritesArray)
          AsyncStorage.setItem(`favorites`, jsonNewFavoritesArray)
          setFavorites(newFavoritesArray)
          setStarred(true)
        }
      }
    }
  }

  const handleLongClick = async () => {
    setShowLoader(false)
    setShowSettingsView(false)
    setShowFavoritesView(true)
  }
  
  return (
    <MainContainer>
      <StyledButton onPress={ handleClick } onLongPress={ handleLongClick } delayLongPress={ 1000 }>
        {starred && !showLoader && !showSettingsView && randomUrl.length ? <AntDesign name="star" size={36} color="gold" /> : <AntDesign name="star" size={36} color={colors.buttonsBarIcons} />}
      </StyledButton>
    </MainContainer>  
  )
}

export default FavoritesButton