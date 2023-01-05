import { ActivityIndicator, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import SearchButton from './src/components/SearchButton'
import BrowserView from './src/components/BrowserView'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SettingsView from './src/components/SettingsView'
import FavoritesView from './src/components/FavoritesView'
import ShowSettingsButton from './src/components/ShowSettingsButton'
import FavoritesButton from './src/components/FavoritesButton'
import defaultTags from './src/utils/defaultTags'
import defaultYears from './src/utils/defaultYears'
import defaultSites from './src/utils/defaultSites'
import { NotifierWrapper } from 'react-native-notifier'
import colors from './src/utils/colors'

const MainContainer = styled.View`
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
  /* padding: 10px 0px 0px 0px; */
`
const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: auto;
  padding: 7px 0px 7px 0px;
  background: lavender;
  background: #6B4C90;
  background: ${colors.buttonsBar}
`
const LoaderContainer = styled.View`
  margin: auto;
`

export default function App() {

  //console.log('starting App.js')

  const [showSettingsView, setShowSettingsView] = useState(true)
  const [showFavoritesView, setShowFavoritesView] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [site, setSite] = useState('')
  const [year, setYear] = useState('')
  const [tags, setTags] = useState([])
  const [lastFetchUrl, setlastFetchUrl] = useState('')
  const [links, setLinks] = useState([])
  const [randomUrl, setRandomUrl] = useState('')
  const [orOperator, setOrOperator] = useState(true)
  const [starred, setStarred] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [currentSite, setCurrentSite] = useState({})
  const [disableStarButton, setDisableStarbutton] = useState(false)

  const getFavorites = async () => {
    let storedFavorites = await AsyncStorage.getItem(`favorites`)
    if (storedFavorites && storedFavorites.length > 0) {
      storedFavorites = JSON.parse(storedFavorites)
      return storedFavorites
    } else {
      return []
    }
  }

  const getStoredTags = async (selectedSite) => {
    let storedTags = await AsyncStorage.getItem(`${selectedSite}-tags`)
    if (storedTags && storedTags.length > 0) {
      storedTags = JSON.parse(storedTags)
      return storedTags
    } else {
      return defaultTags[`${selectedSite}`]
    }
  }

  const getSelectedYear = async () => {
    let storedYear = await AsyncStorage.getItem(`year`)
    if (storedYear && storedYear.length > 0) {
      storedYear = JSON.parse(storedYear)
      return storedYear
    } else {
      const selectedYear = defaultYears['years'].find(year => year.name === '2018')
      return selectedYear.value
    }
  }

  const getOrOperatorState = async () => {
    let storedOrOperatorState = await AsyncStorage.getItem(`orOperator`)
    if (storedOrOperatorState && storedOrOperatorState.length > 0) {
      storedOrOperatorState = JSON.parse(storedOrOperatorState)
      return storedOrOperatorState
    } else {
      return true
    }
  }

  const getSelectedSite = async () => {
    let storedSite = await AsyncStorage.getItem(`site`)
    if (storedSite && storedSite.length > 0) {
      storedSite = JSON.parse(storedSite)
      return storedSite
    } else {
      const selectedSite = defaultSites['sites'].find(site => site.value === 'stackoverflow')
      return selectedSite.value
    }
  }

  useEffect(() => {
    const initializeValues = async () => {
      const selectedSite = await getSelectedSite()
      setSite(selectedSite)
      const storedFavorites = await getFavorites()
      setFavorites(storedFavorites)
      const selectedYear = await getSelectedYear()
      setYear(selectedYear)
      const orOperatorState = await getOrOperatorState()
      setOrOperator(orOperatorState)
      const storedTags = await getStoredTags(selectedSite)
      const selectedTags = storedTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
      setTags(selectedTags)
    }
    initializeValues()
  }, [])

/*   console.log('tags:', tags)
  console.log('year:', year)
  console.log('site:', site)
  console.log('orOperator:', orOperator)*/
 
  if (site.length < 1 || year.length < 1) { return null }

  return (
    <NotifierWrapper>
      <StatusBar backgroundColor="#000000" StatusBarStyle="light-content"></StatusBar>

      <MainContainer>

        {
          showFavoritesView &&
          <FavoritesView favorites={favorites} setFavorites={setFavorites} setRandomUrl={setRandomUrl} setShowFavoritesView={setShowFavoritesView} ></FavoritesView>
        }

        { 
          showSettingsView &&
          <SettingsView getStoredTags={getStoredTags} year={year} setYear={setYear} site={site} setSite={setSite} tags={tags} setTags={setTags} orOperator={orOperator} setOrOperator={setOrOperator} ></SettingsView>
        }
        
        {
          showLoader && 
          <LoaderContainer>
            <ActivityIndicator size="large" color={colors.primary} />
          </LoaderContainer> 
        }

        {!showLoader && !showSettingsView && !showFavoritesView && randomUrl.length > 0 &&
          <BrowserView randomUrl={randomUrl} setStarred={setStarred} favorites={favorites} setCurrentSite={setCurrentSite} currentSite={currentSite} setDisableStarbutton={setDisableStarbutton}></BrowserView>
        }
        
        <ButtonsContainer>
          <ShowSettingsButton setShowSettingsView={setShowSettingsView} showSettingsView={showSettingsView} randomUrl={randomUrl} setStarred={setStarred} setShowFavoritesView={setShowFavoritesView} ></ShowSettingsButton>
          <SearchButton setShowSettingsView={setShowSettingsView} setShowLoader={setShowLoader} year={year} site={site} tags={tags} lastFetchUrl={lastFetchUrl} setlastFetchUrl={setlastFetchUrl} links={links} setLinks={setLinks} setRandomUrl={setRandomUrl} orOperator={orOperator} setStarred={setStarred} setShowFavoritesView={setShowFavoritesView} setCurrentSite={setCurrentSite} setDisableStarbutton={setDisableStarbutton} ></SearchButton>
          <FavoritesButton starred={starred} setStarred={setStarred} site={site} showLoader={showLoader} setShowLoader={setShowLoader} showSettingsView={showSettingsView} setShowSettingsView={setShowSettingsView} randomUrl={randomUrl} setFavorites={setFavorites} showFavoritesView={showFavoritesView} setShowFavoritesView={setShowFavoritesView} currentSite={currentSite} disableStarButton={disableStarButton} setDisableStarbutton={setDisableStarbutton} ></FavoritesButton>
        </ButtonsContainer>
      </MainContainer>
    </NotifierWrapper>
  )
}
