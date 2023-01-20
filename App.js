import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StatusBar, BackHandler, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styled from 'styled-components/native'
import SettingsView from './src/components/SettingsView'
import BrowserView from './src/components/BrowserView'
import FavoritesView from './src/components/FavoritesView'
import SearchButton from './src/components/SearchButton'
import ShowSettingsButton from './src/components/ShowSettingsButton'
import FavoritesButton from './src/components/FavoritesButton'
import defaultTags from './src/utils/defaultTags'
import defaultYears from './src/utils/defaultYears'
import defaultSites from './src/utils/defaultSites'
import colors from './src/utils/colors'
import { NotifierWrapper } from 'react-native-notifier'

const MainContainer = styled.View`
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
`
const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: auto;
  padding: 7px 0px 7px 0px;
  background: ${colors.buttonsBar}
`
const LoaderContainer = styled.View`
  margin: auto;
`
export default function App() {

  const [lastScreen, setLastScreen] = useState('')
  const [showSettingsView, setShowSettingsView] = useState(true)
  const [showFavoritesView, setShowFavoritesView] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [site, setSite] = useState('')
  const [year, setYear] = useState('')
  const [allTags, setAllTags] = useState([])
  const [tags, setTags] = useState([])
  const [links, setLinks] = useState([])
  const [randomUrl, setRandomUrl] = useState('')
  const [orOperator, setOrOperator] = useState(true)
  const [starred, setStarred] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [currentSite, setCurrentSite] = useState({})
  const [disableStarButton, setDisableStarbutton] = useState(false)
  const [backPressCount, setBackPressCount] = useState(0)
  const [closeOnBackButtonClick, setCloseOnBackButtonClick] = useState(false)

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (backPressCount === 0 && !closeOnBackButtonClick) {
      setBackPressCount(1)
      setTimeout(() => setBackPressCount(0), 300)
    } else if (backPressCount === 1 && !closeOnBackButtonClick) {
      ToastAndroid.show('Press one more time to exit app', ToastAndroid.SHORT)
      setCloseOnBackButtonClick(true)
      setTimeout(() => setCloseOnBackButtonClick(false), 2000)
      return true
    } else if (closeOnBackButtonClick) {
      BackHandler.exitApp()
      return true
    }
    if (lastScreen.length > 0 && backPressCount === 0) {
      setStarred(false)
      setDisableStarbutton(false)
      setShowLoader(false)
      const newLastScreen = showFavoritesView ? 'favorites' : showSettingsView ? 'settings' : 'browser'
      switch (lastScreen) {
        case 'favorites':
          setShowSettingsView(false)
          setShowFavoritesView(true)
          setLastScreen(newLastScreen)
        break
        case 'settings':
          setShowFavoritesView(false)
          setShowSettingsView(true)
          setLastScreen(newLastScreen)
        break
        default:
          setShowFavoritesView(false)
          setShowSettingsView(false)
          setLastScreen(newLastScreen)
        break
      }
      return true
    } else {
      BackHandler.exitApp()
    }
    return false
  })

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
      const selectedYear = defaultYears['years'].find(year => year.name === '2015')
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
      const selectedYear = await getSelectedYear()
      setYear(selectedYear)
      const orOperatorState = await getOrOperatorState()
      setOrOperator(orOperatorState)
      const storedFavorites = await getFavorites()
      setFavorites(storedFavorites)
    }
    initializeValues()
  }, [])

  useEffect(() => {
    const getTags = async () => {
      if (site.length > 1) {
        const storedTags = await getStoredTags(site)
        setAllTags(storedTags)
      const selectedTags = storedTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
      setTags(selectedTags)
    }
    }
    getTags()
  }, [site])

/*console.log('tags:', tags)
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
          <FavoritesView setLastScreen={setLastScreen} favorites={favorites} setFavorites={setFavorites} setRandomUrl={setRandomUrl} setShowFavoritesView={setShowFavoritesView} ></FavoritesView>
        }

        { 
          showSettingsView &&
          <SettingsView allTags={allTags} setAllTags={setAllTags} year={year} setYear={setYear} site={site} setSite={setSite} setTags={setTags} orOperator={orOperator} setOrOperator={setOrOperator} ></SettingsView>
        }
        
        {
          showLoader && 
          <LoaderContainer>
            <ActivityIndicator size="large" color={colors.primary} />
          </LoaderContainer> 
        }

        {!showLoader && !showSettingsView && !showFavoritesView && randomUrl.length > 0 &&
          <BrowserView currentSite={currentSite} setShowLoader={setShowLoader} closeOnBackButtonClick={closeOnBackButtonClick} setCloseOnBackButtonClick={setCloseOnBackButtonClick} backPressCount={backPressCount} setBackPressCount={setBackPressCount} disableStarButton={disableStarButton} setLastScreen={setLastScreen} setShowSettingsView={setShowSettingsView} setShowFavoritesView={setShowFavoritesView} lastScreen={lastScreen} randomUrl={randomUrl} setStarred={setStarred} favorites={favorites} setCurrentSite={setCurrentSite} setDisableStarbutton={setDisableStarbutton}></BrowserView>
        }
        <ButtonsContainer>
          <ShowSettingsButton setDisableStarbutton={setDisableStarbutton} showFavoritesView={showFavoritesView} setLastScreen={setLastScreen} setShowSettingsView={setShowSettingsView} showSettingsView={showSettingsView} setStarred={setStarred} setShowFavoritesView={setShowFavoritesView} ></ShowSettingsButton>
          <SearchButton setLastScreen={setLastScreen} setShowSettingsView={setShowSettingsView} showFavoritesView={showFavoritesView} setShowLoader={setShowLoader} year={year} site={site} tags={tags} links={links} setLinks={setLinks} setRandomUrl={setRandomUrl} orOperator={orOperator} setStarred={setStarred} setShowFavoritesView={setShowFavoritesView} setCurrentSite={setCurrentSite} setDisableStarbutton={setDisableStarbutton}></SearchButton>
          <FavoritesButton showFavoritesView={showFavoritesView} setLastScreen={setLastScreen} starred={starred} setStarred={setStarred} showLoader={showLoader} setShowLoader={setShowLoader} showSettingsView={showSettingsView} setShowSettingsView={setShowSettingsView} randomUrl={randomUrl} setFavorites={setFavorites} setShowFavoritesView={setShowFavoritesView} currentSite={currentSite} disableStarButton={disableStarButton} setDisableStarbutton={setDisableStarbutton} ></FavoritesButton>
        </ButtonsContainer>
      </MainContainer>
    </NotifierWrapper>
  )
}
