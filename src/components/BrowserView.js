import { View, Alert, BackHandler } from 'react-native'
import React, { useRef, useState } from "react"
import { WebView } from 'react-native-webview'

const BrowserView = ({ disableStarButton, setLastScreen, setShowSettingsView, setShowFavoritesView, lastScreen, randomUrl, setStarred, favorites, currentSite, setCurrentSite, setDisableStarbutton}) => {

  const webViewRef = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)

  BackHandler.addEventListener('hardwareBackPress', () => {
    //console.log('pressed back', webViewRef.current?.goBack())
    if (canGoBack) {
      try {
        webViewRef.current?.goBack()
    } catch (err) {
        //console.log("[handleBackButtonPress] Error : ", err.message)
    }
      return true
    } else {
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
        /* default:
          setShowFavoritesView(false)
          setShowSettingsView(false)
          setLastScreen(newLastScreen)
        break */
      }
    }
    return false
  })

  const handleOnLoadStart = (pageInfo) => {
    //console.log('OnLoadstart:', pageInfo.title)
    setDisableStarbutton(true)
    setStarred(favorites.some(site => site.url === pageInfo.url))
    setCurrentSite({})
  }

  const handleOnLoadProgress = (pageInfo) => {
    if (typeof pageInfo.title == 'undefined' || pageInfo.title.length < 1 || pageInfo.title === pageInfo.url || !disableStarButton) return 
    //console.log('handleOnLoadProgress:', pageInfo.title)
    const cleanedTitle = pageInfo.title.substr(0, pageInfo.title.lastIndexOf('-')).trim()
    setCurrentSite({title: cleanedTitle, url: pageInfo.url})
    setCanGoBack(pageInfo.canGoBack)
    setDisableStarbutton(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: randomUrl }}
        onLoadStart={ (event) => { handleOnLoadStart(event.nativeEvent) } }
        onLoadProgress={(event) => { handleOnLoadProgress(event.nativeEvent) }}
        ref={webViewRef}
        onError={ () => {
            Alert.alert(
              'Error',
              `The page is not loading correctly, please try again later.`,
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