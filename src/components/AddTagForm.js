import React, { useState, useEffect, useRef } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo"
import { Notifier, NotifierComponents  } from 'react-native-notifier'
import colors from '../utils/colors'
import Dialog from 'react-native-dialog'
import keys from '../utils/keys'

const AddTagForm = ({ site, allTags, setAllTags, showAddTagForm, setShowAddTagForm, setDeleteTags }) => {

  const [newTag, onChangeText] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (value) => {
    
    const tagName = value.trim().toLowerCase()

    if (tagName.length < 1) return

    const tagAlreadyExists = allTags.some(tag => {
      return tag.name === tagName
    })
    if (tagAlreadyExists) {
      Alert.alert(
        "Tag already exists",
        `the tag "${tagName}" is already added`,
        [ ],
        { cancelable: true }
      )
    } else {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Alert.alert(
            "No internet connection",
            `You need to be connected to the internet to add a new tag`,
            [ ],
            { cancelable: true }
          )
        } else {
          const apiKey = keys.apyKey
          const fetchUrlBase = apiKey.length > 0 ? `https://api.stackexchange.com/2.3/search/advanced?key=${apiKey}&` : `https://api.stackexchange.com/2.3/search/advanced?`
          let siteForUrl = site
          switch (site) {
            case 'threedprinting':
              siteForUrl = '3dprinting'
            break
            case 'mathoverflownet':
              siteForUrl = 'mathoverflow.net'
            break
            case 'esstackoverflow':
              siteForUrl = 'es.stackoverflow'
            break
            case 'jastackoverflow':
              siteForUrl = 'ja.stackoverflow'
            break
            case 'ptstackoverflow':
              siteForUrl = 'pt.stackoverflow'
            break
            case 'rustackoverflow':
              siteForUrl = 'ru.stackoverflow'
            break
          }
          const url = fetchUrlBase + `pagesize=1&tagged=${tagName}&site=${siteForUrl}&filter=!0ynczPwaq3R_qM75`
          fetch(url)
          .then(response => response.json())
          .then(data => {
            if (typeof data.items == 'undefined') { 
              Alert.alert(
                "Error",
                `There was an error while checking if the tag exists on the selected site.\n\nPlease make sure your internet connection is working and try again later.`,
                [ ],
                { cancelable: true }
              )
              return
            }
            if (data.items.length === 0) {
              Alert.alert(
                "Tag does not exists",
                `The tag "${tagName}" does not exist on the selected site.\n\nPlease remember that multiple words tags are written as dash separated values.\nExample: microsoft-excel`,
                [ ],
                { cancelable: true }
              )
            } else {
              const tagToAdd = {name: tagName, selected: false}
              const newAllTags = [...allTags, tagToAdd]
              newAllTags.sort((a, b) => a.name.localeCompare(b.name))
              const jsonNewTagsArray = JSON.stringify(newAllTags)
              AsyncStorage.setItem(`${site}-tags`, jsonNewTagsArray)
              setAllTags(newAllTags)
              onChangeText('')
              setShowAddTagForm(false)
              Notifier.showNotification({
                translucentStatusBar: true,
                title: `Tag added`,
                description: `The tag "${tagToAdd.name}" was added succesfully`,
                duration: 2500,
                showAnimationDuration: 500,
                Component: NotifierComponents.Notification,
                componentProps: {
                  titleStyle: {color: 'white', fontSize: 24, fontWeight: '600'},
                  descriptionStyle: {color: 'white', fontSize: 16, fontWeight: '600'},
                  containerStyle: {backgroundColor: colors.primary}
                }, 
                hideOnPress: true,
              })
            }
          })
        }
      })

    }
  }

  const handleCancel = () => {
    onChangeText('')
    setShowAddTagForm(false)
  }
  
  return (
    <Dialog.Container visible={showAddTagForm} onBackdropPress={handleCancel} onRequestClose={handleCancel} >
      <Dialog.Input 
        autoFocus={false}
        textInputRef={inputRef}
        autoCapitalize='none'
        maxLength={35}
        onFocus={() => setDeleteTags(false)}
        onPressIn={() => setDeleteTags(false)}
        onChangeText={onChangeText}
        onSubmitEditing={() => handleSubmit(newTag)}
        value={newTag}
        placeholder="new-tag-here"
        style={{paddingVertical: 0, fontSize: 16, lineHeight: 16, color: 'black', backgroundColor: 'white', height: 40}}
      />
      <Dialog.Button label="Cancel" onPress={handleCancel} />
      <Dialog.Button label="OK" onPress={() => handleSubmit(newTag)}  />
    </Dialog.Container>
  )
}

export default AddTagForm
