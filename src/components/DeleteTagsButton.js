import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
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

  const handleClick = () => {
    setDeleteTags(!deleteTags)
  }


  
  return (
    <MainContainer >
      <StyledDeleteTagsButton onPress={handleClick} >
        { deleteTags ?
          <FontAwesome name="trash" size={32} color="orange" />
          :
          <FontAwesome name="trash-o" size={32} color="black" />
        }  
      </StyledDeleteTagsButton>
    </MainContainer>
  )
}

export default DeleteTagsButton
