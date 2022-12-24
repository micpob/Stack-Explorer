import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView, StyleSheet, TextInput, Text, View, Platform, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo"
import { Notifier, Easing, NotifierComponents  } from 'react-native-notifier';

const MainContainer = styled.View`
  align-self: center;
  padding: 4px;
  margin: 4px;
  width: 100%;
`

const StyledAddTagForm = styled.TouchableOpacity`
  
`

const StyledTextButton = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

const StyledInputField = styled.TextInput`
  height: 40px;
  margin: 8px;
  border-width: 1px;
  padding: 8px;
  background: white;
`

const AddTagForm = ({ site, allTags, setAllTags, setDeleteTags }) => {

  const [newTag, onChangeText] = React.useState('')

  const handleSubmit = (value) => {
    if (value.trim().length < 1) return
    
    const tagName = value.trim().toLowerCase()
    const tagAlreadyExists = allTags.some(tag => {
      return tag.name === tagName
    })
    console.log('tag already exists:', tagAlreadyExists)
    if (tagAlreadyExists) {
      /* Notifier.showNotification({
        translucentStatusBar: true,
        title: `Tag already exists`,
        description: `The tag "${tagName}" is already added`,
        duration: 2500,
        showAnimationDuration: 500,
        Component: NotifierComponents.Notification,
        componentProps: {
          titleStyle: {fontSize: 24, fontWeight: '600'},
          descriptionStyle: {fontSize: 16, fontWeight: '600'}
          
        }, */
        /* showEasing: Easing.bounce, */
        /* onHidden: () => console.log('Hidden'),
        onPress: () => console.log('Press'), */
        /* hideOnPress: true,
      }) */
      Alert.alert(
        "Tag already exists",
        `the tag "${tagName}" is already added`,
        [ ],
        {
          cancelable: true
        }
      )
    } else {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Alert.alert(
            "No internet connection",
            `You need to be connected to the internet to add a new tag`,
            [ ],
            {
              cancelable: true
            }
          )
        } else {
          const url = `https://api.stackexchange.com/2.3/search/advanced?pagesize=5&order=desc&sort=activity&tagged=${value}&site=${site}&filter=!0ynczPwaq3R_qM75`

          fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log('data:', data)
            if (typeof data.items == 'undefined') { console.log('data.items undefined'); setPage(1); return}
            if (data.items.length === 0) {
              Alert.alert(
                "Tag does not exists",
                `The tag "${tagName}" does not exist on ${site}. 
    
    Please try with another tag.`,
                [ ],
                {
                  cancelable: true
                }
              )
            } else {
              const tagToAdd = {name: tagName, selected: false}
              console.log('tagToAdd:', tagToAdd)
              console.log('allTags:', allTags)
              const newAllTags = [...allTags, tagToAdd]
              console.log('newAllTags:', newAllTags)
              newAllTags.sort((a, b) => a.name.localeCompare(b.name))
              const jsonNewTagsArray = JSON.stringify(newAllTags)
              AsyncStorage.setItem(`${site}-tags`, jsonNewTagsArray)
              setAllTags(newAllTags)
              onChangeText('')
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
                  containerStyle: {backgroundColor: 'green'}
                }, 
                /* showEasing: Easing.bounce, */
                /* onHidden: () => console.log('Hidden'),
                onPress: () => console.log('Press'), */
                hideOnPress: true,
              })
            }
          })
        }
      })

    }
  }
  
  return (
    <MainContainer >
      {/* <StyledAddTagForm onPress={handleClick} >
        <StyledTextButton>ADD TAG</StyledTextButton> */}
        <SafeAreaView>
          <StyledInputField
            autoCapitalize='none'
            maxLength={35}
            onFocus={() => setDeleteTags(false)}
            onPressIn={() => setDeleteTags(false)}
            onChangeText={onChangeText}
            onSubmitEditing={() => handleSubmit(newTag)}
            value={newTag}
            placeholder="Add new tag here"
          />
        </SafeAreaView>
      {/* </StyledAddTagForm> */}
    </MainContainer>
  )
}

export default AddTagForm
