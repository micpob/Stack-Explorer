import { View,Alert } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { WebView } from 'react-native-webview'

const BrowserView = ({ randomUrl, setStarred, favorites, setCurrentSite }) => {

  const handleOnLoadStart = (pageInfo) => {
    setStarred(favorites.some(site=> site.url === pageInfo.url))
  }

  const handleOnLoad = (pageInfo) => {
    const cleanedTitle = pageInfo.title.substr(0, pageInfo.title.lastIndexOf('-')).trim()
    setCurrentSite({title: cleanedTitle, url: pageInfo.url})
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: randomUrl }}
        onLoadStart={ (event) => { handleOnLoadStart(event.nativeEvent) } }
        onLoad={(event) => { handleOnLoad(event.nativeEvent) }}
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