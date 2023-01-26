import React, { useRef, useState } from "react"
import { View, Alert, BackHandler, ToastAndroid } from 'react-native'
import { WebView } from 'react-native-webview'
import defaultSites from '../utils/defaultSites'

const BrowserView = ({ site, buttonOpacity, setButtonOpacity, currentSite, setShowLoader, closeOnBackButtonClick, setCloseOnBackButtonClick, setBackPressCount, backPressCount, disableStarButton, setLastScreen, setShowSettingsView, setShowFavoritesView, lastScreen, randomUrl, setStarred, favorites, setCurrentSite, setDisableStarbutton}) => {

  const webViewRef = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (backPressCount === 0 && !closeOnBackButtonClick) {
      setBackPressCount(1)
      setTimeout(() => setBackPressCount(0), 300)
      if (canGoBack) {
        try {
          webViewRef.current?.goBack()
        } catch (err) {
        }
        return true
      } else {
        setStarred(false)
        setDisableStarbutton(false)
        setShowLoader(false)
        switch (lastScreen) {
          case 'favorites':
            setShowSettingsView(false)
            setShowFavoritesView(true)
            setLastScreen('browser')
          break
          case 'settings':
            setShowFavoritesView(false)
            setShowSettingsView(true)
            setLastScreen('browser')
          break
        }
        return true
      }
    } else if (backPressCount === 1 && !closeOnBackButtonClick) {
      ToastAndroid.show('Press one more time to exit app', ToastAndroid.SHORT)
      setCloseOnBackButtonClick(true)
      setTimeout(() => setCloseOnBackButtonClick(false), 2000)
      return true
    } else if (closeOnBackButtonClick) {
      BackHandler.exitApp()
      return true
    }
    return false
  })

  const setNewCurrentSite = (pageInfo) => {
    if (pageInfo.url.includes(site)) {
      const siteObj = defaultSites['sites'].find(siteObj => siteObj.value === site)
      const cleanedTitle = pageInfo.title.substr(0, pageInfo.title.lastIndexOf('-')).trim()
      setCurrentSite({siteName: siteObj.name ?? '', title: cleanedTitle, url: pageInfo.url})
      setCanGoBack(pageInfo.canGoBack)
      setDisableStarbutton(false)
    } else {
      const specialNameSites = ['3dprinting', 'mathoverflow.net', 'pt.stackoverflow', 'es.stackoverflow', 'ru.stackoverflow', 'ja.stackoverflow']
      if (specialNameSites.some(el => pageInfo.url.includes(el))) {
        let siteName
        switch (site) {
          case 'threedprinting':
            siteName = '3D Printing'
          break
          case 'mathoverflownet':
            siteName = 'MathOverflow'
          break
          case 'esstackoverflow':
            siteName = 'Stack Overflow en español'
          break
          case 'jastackoverflow':
            siteName = 'スタック・オーバーフロー'
          break
          case 'ptstackoverflow':
            siteName = 'Stack Overflow em Português'
          break
          case 'rustackoverflow':
            siteName = 'Stack Overflow на русском'
          break
          default:
            siteName = ''
        }
        const cleanedTitle = pageInfo.title.substr(0, pageInfo.title.lastIndexOf('-')).trim()
        setCurrentSite({siteName: siteName, title: cleanedTitle, url: pageInfo.url})
        setCanGoBack(pageInfo.canGoBack)
        setDisableStarbutton(false)
      } else {
        setCurrentSite({siteName: '', title: '', url: pageInfo.url})
        setCanGoBack(pageInfo.canGoBack)
        setDisableStarbutton(false)
      }
    }
  }

  const handleOnLoadStart = (pageInfo) => {
    setDisableStarbutton(true)
    setStarred(favorites.some(site => site.url === pageInfo.url))
    setCurrentSite({})
  }

  const handleOnLoadProgress = (pageInfo) => {
    if (disableStarButton === false && buttonOpacity !== 1) {
      setButtonOpacity(1)
    }
     if (typeof pageInfo.title == 'undefined' || pageInfo.title.length < 1 || pageInfo.title.startsWith('https://') || disableStarButton === false) {
      return
    } else {
      setNewCurrentSite(pageInfo)
    }
  }

  const handleOnLoad = (pageInfo) => {
    if (typeof currentSite.title == 'undefined') {
      setNewCurrentSite(pageInfo)
      setButtonOpacity(1)
    }
  }
  
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: randomUrl }}
        onLoadStart={ (event) => { handleOnLoadStart(event.nativeEvent) }}
        onLoadProgress={(event) => { handleOnLoadProgress(event.nativeEvent) }}
        onLoad={(event) => { handleOnLoad(event.nativeEvent) }}
        ref={webViewRef}
        onError={ () => {
            Alert.alert(
              'Error',
              `The page is not loading correctly, please check your internet connection and try again later.`,
              [ ],
              { cancelable: true }
            )
          }
        }
      />
    </View>
  )
}

export default BrowserView