import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../utils/colors'
import defaultSites from '../utils/defaultSites'
import DeleteFavoritesButton from './DeleteFavoritesButton'
import { AntDesign } from '@expo/vector-icons'

const MainContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  background: ${colors.settingsBackground};
`

const TableContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const TableHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
  background-color: ${colors.primary};
`

const HeaderSiteCell = styled.View`
  flex: 1;
`

const HeaderTitleCell = styled.View`
  flex: ${props => props.deleteFavorites ? '0' : '2'};
  margin-left: 8px;
`

const HeaderText = styled.Text`
  font-size: ${props => props.deleteFavorites ? '20px' : '24px'}; 
  font-weight: 500;
  color: white; 
`

const RowsContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background-color: ${props => props.index % 2 === 0 ? props.deleteFavorites ? '#ffaf1a' : colors.settingsBoxBackground : props.deleteFavorites ? '#ffdb99' : 'white'}
`

const SiteCell = styled.View`
  flex: 1;
`

const TitleCell = styled.View`
  flex: 2
`

const CellText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.deleteFavorites ? props.index % 2 === 0 ? 'white' : '#343434' : props.index % 2 === 0 ? colors.primary : '#686868'};
`

const AlertTextContainer = styled.View`
  margin: auto;padding: 8px;
`
const AlertText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: #343434';
`

const FavoritesView = ({ setButtonOpacity, setLastScreen, favorites, setFavorites, setRandomUrl, setShowFavoritesView }) => {

  const [deleteFavorites, setDeleteFavorites] = useState(false)
  
  useEffect(() => {
    setButtonOpacity(1)
  }, [])

  const handleClick = (url) => {
    if (!deleteFavorites) {
      setLastScreen('favorites')
      setRandomUrl(url)
      setShowFavoritesView(false)
    }
  }

  const handleLongClick = async (url) => {
    if (deleteFavorites) {
      let storedFavorites = await AsyncStorage.getItem(`favorites`)
      if (storedFavorites && storedFavorites.length > 0) {
        storedFavorites = JSON.parse(storedFavorites)
        const newFavoritesArray = storedFavorites.filter(favorite => favorite.url !== url)
        const jsonNewFavoritesArray = JSON.stringify(newFavoritesArray)
        AsyncStorage.setItem(`favorites`, jsonNewFavoritesArray)
        setFavorites(newFavoritesArray)
      }
    }
  }
  
  return (
    <MainContainer>
      { favorites.length > 0 ?
          <TableContainer>
            <TableHeader><HeaderSiteCell deleteFavorites={deleteFavorites}><HeaderText deleteFavorites={deleteFavorites}>{ deleteFavorites ? 'Long click on a row to delete it' : 'Site' }</HeaderText></HeaderSiteCell><HeaderTitleCell deleteFavorites={deleteFavorites}><HeaderText>{ deleteFavorites ? '' : 'Title' }</HeaderText></HeaderTitleCell><DeleteFavoritesButton deleteFavorites={deleteFavorites} setDeleteFavorites={setDeleteFavorites}></DeleteFavoritesButton></TableHeader>
            <RowsContainer>
              {favorites.map((favorite, index) => <TouchableOpacity key={index} onPress={() => handleClick(favorite.url)} onLongPress={() => handleLongClick(favorite.url)} ><Row index={index} deleteFavorites={deleteFavorites} ><SiteCell><CellText index={index} deleteFavorites={deleteFavorites}>{favorite.siteName}</CellText></SiteCell><TitleCell><CellText index={index} deleteFavorites={deleteFavorites}>{favorite.title}</CellText></TitleCell></Row></TouchableOpacity>)}
            </RowsContainer>
          </TableContainer>
        :
          <AlertTextContainer>
            <AlertText>There are no favorites yet.</AlertText>
            <AlertText>Add new favorites by clicking on the star button while visiting a page.<AntDesign name="star" size={36} color="gold" /></AlertText>
          </AlertTextContainer>
      }
    </MainContainer>
    
  )
}

export default FavoritesView