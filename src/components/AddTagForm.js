import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView, StyleSheet, TextInput, Text, View, Platform, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


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

const AddTagForm = ({ site, allTags, setAllTags }) => {

  const [newTag, onChangeText] = React.useState('')

  const handleSubmit = (value) => {

    if (value.length < 1) return

    const tagAlreadyExists = allTags.some(tag => {
      return tag.name.toLowerCase() === value.toLowerCase()
    })
    console.log('tag already exists:', tagAlreadyExists)
    if (tagAlreadyExists) {
      Alert.alert(
        "Tag already exists",
        `the tag "${value}" is already added`,
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
            `The tag "${value}" does not exist on ${site}. 

Please try with another tag.`,
            [ ],
            {
              cancelable: true
            }
          )
        } else {
          const tagToAdd = {name: value, selected: false}
          console.log('tagToAdd:', tagToAdd)
          console.log('allTags:', allTags)
          const newAllTags = [...allTags, tagToAdd]
          console.log('newAllTags:', newAllTags)
          const jsonNewTagsArray = JSON.stringify(newAllTags)
          AsyncStorage.setItem(`${site}-tags`, jsonNewTagsArray)
          setAllTags(newAllTags)
          onChangeText('')
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
            maxLength={35}
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
