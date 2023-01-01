import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../utils/colors'

const MainContainer = styled.View`
`

const StyledDeleteTagsButton = styled.TouchableOpacity`
  
`
const DeleteTagsButton = ({deleteTags, setDeleteTags}) => {

  const printAsyncStorage = async () => {
    await AsyncStorage.getAllKeys((err, keys) => {
      console.log('Keys:', keys)
      AsyncStorage.multiGet(keys, (error, stores) => {
        let asyncStorage = {}
        stores.map((result, i, store) => {
          asyncStorage[store[i][0]] = store[i][1]
        })
        console.log(asyncStorage.favorites)
        //console.table(asyncStorage)
        let sizeInBytes = new Blob([JSON.stringify(asyncStorage)]).size
        var sizeInMB = (sizeInBytes / (1024*1024)).toFixed(2)
        console.info('SIZE in mb:', sizeInMB)
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
