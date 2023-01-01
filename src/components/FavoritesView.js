import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native'
import { Table, Row, Rows } from 'react-native-table-component'
import React, { useState, useRef, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notifier, Easing, NotifierComponents  } from 'react-native-notifier';
import colors from '../utils/colors'

const MainContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 8px 8px 0px 8px;
  background: ${colors.settingsBackground};
`

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StyledTitle = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: ${colors.primary};
`

const YearSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  flex: 1;
  background: ${colors.settingsBoxBackground};
  padding: 8px;
  border-radius: 8px;
  margin: 8px;
`
const SiteSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  flex: 1;
  background: ${colors.settingsBoxBackground};
  padding: 8px;
  border-radius: 8px;
  margin: 8px;
`
const TagsSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin-top: auto;
  flex: 6;
  background: ${colors.settingsBoxBackground};
  padding: 8px;
  border-radius: 8px;
  margin: 8px;
`
const TagsContainer = styled.ScrollView`
  max-height: 70%;
  margin: 2px;
`
const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
})

const FavoritesView = ({ favorites, setFavorites }) => {

  /* const sites = favorites.map(url => {
    const siteName = url.includes('stackexchange') ? url.split('https://')[1].split('.stackexchange')[0] : url.split('https://')[1].split('.com')[0]
    console.log(siteName)
  }) */

/*   const titles = favorites.map(url => {

  }) */

  const tableHead = ['URL', 'Delete']
  const tableData = [
    ['1', '2', '3', '4'],
    ['a', 'b', 'c', 'd'],
    ['1', '2', '3', '456\n789'],
    ['a', 'b', 'c', 'd']
  ]

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  })

  
  return (
    <MainContainer >
        {
          favorites.map(site => {
            return <Text>{site.title} {site.url}</Text>
          })
        }
        
    </MainContainer>
  )
}

export default FavoritesView