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

const StyledTextButton = styled.Text`
  color: ${props => props.deleteTags ? 'black' : 'gray'};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`
const DeleteTagsButton = ({deleteTags, setDeleteTags}) => {

  const handleClick = () => {
    setDeleteTags(!deleteTags)
  }


  
  return (
    <MainContainer >
      <StyledDeleteTagsButton onPress={handleClick} >
        {/* <Ionicons name="trash-outline" size={32} color="black" /> */}
        { deleteTags ?
          <FontAwesome name="trash" size={32} color="orange" />
          :
          <FontAwesome name="trash-o" size={32} color="black" />
        }  
        {/* <FontAwesome name="trash-o" size={32} color="black" deleteTags={deleteTags} /> */}
        {/* <StyledTextButton deleteTags={deleteTags}>D</StyledTextButton> */}
      </StyledDeleteTagsButton>
    </MainContainer>
  )
}

export default DeleteTagsButton
