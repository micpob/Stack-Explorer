import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView, StyleSheet, TextInput, Text, View, Platform, Button, TouchableOpacity  } from 'react-native';
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
