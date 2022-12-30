import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../utils/colors'

const MainContainer = styled.View`
  /* border: 1px solid black;
  border-radius: 8px; */
  padding: 4px;
  margin: 4px;
  /* background: ${props => props.deleteTags ? 'orange' : 'white'}; */
`

const StyledDeleteTagsButton = styled.TouchableOpacity`
  
`
const DeleteTagsButton = ({deleteTags, setDeleteTags}) => {

  const printAsyncStorage = async () => {
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        let asyncStorage = {}
        stores.map((result, i, store) => {
          asyncStorage[store[i][0]] = store[i][1]
        })
        console.log(asyncStorage)
        console.table(asyncStorage)
      })
    })
  }

  const handleClick = async () => {

    console.log('printing storage:')
    await printAsyncStorage() 

    setDeleteTags(!deleteTags)
  }

  const handleLongClick = async () => {
    AsyncStorage.clear()
    //const keys = AsyncStorage.getAllKeys() 
    console.log('cleaned storage')
  }
  
  return (
    <MainContainer >
      <StyledDeleteTagsButton onPress={handleClick} onLongPress={handleLongClick} >
        { deleteTags ?
          <FontAwesome name="trash" size={32} color={colors.deleteMain} />
          :
          <FontAwesome name="trash-o" size={32} color="black" />
        }  
      </StyledDeleteTagsButton>
    </MainContainer>
  )
}

export default DeleteTagsButton
