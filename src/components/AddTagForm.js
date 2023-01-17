import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo"
import { Notifier, Easing, NotifierComponents  } from 'react-native-notifier';
import colors from '../utils/colors'
import Dialog from "react-native-dialog";

const MainContainer = styled.View`
  align-self: center;
  padding: 4px;
  width: 100%;
`

const StyledInputField = styled.TextInput`
  height: 40px;
  width: 90%;
  max-width: 400px;
  border-width: 1px;
  border-radius: 4px;
  padding: 8px;
  background: white;
  margin: auto;
`

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
    //console.log('tag already exists:', tagAlreadyExists)
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
          const url = `https://api.stackexchange.com/2.3/search/advanced?pagesize=1&tagged=${tagName}&site=${site}&filter=!0ynczPwaq3R_qM75`
          fetch(url)
          .then(response => response.json())
          .then(data => {
            //console.log('data:', data)
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
              //console.log('tagToAdd:', tagToAdd)
              //console.log('allTags:', allTags)
              const newAllTags = [...allTags, tagToAdd]
              //console.log('newAllTags:', newAllTags)
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
    <Dialog.Container visible={showAddTagForm} onBackdropPress={handleCancel} onRequestClose={handleCancel}  >
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
      />
      <Dialog.Button label="Cancel" onPress={handleCancel} />
      <Dialog.Button label="OK" onPress={() => handleSubmit(newTag)}  />
    </Dialog.Container>
  )
}

export default AddTagForm
