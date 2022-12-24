import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';


const MainContainer = styled.View`
  border: 1px solid black;
  border-radius: 8px;
  padding: 4px;
  margin: 4px;
  min-width: 32px;
  background: ${props => props.deleteTags ? 'orange' : 'white'};
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
    <MainContainer deleteTags={deleteTags}>
      <StyledDeleteTagsButton onPress={handleClick}>
        <StyledTextButton deleteTags={deleteTags}>D</StyledTextButton>
      </StyledDeleteTagsButton>
    </MainContainer>
  )
}

export default DeleteTagsButton
