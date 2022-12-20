import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';


const MainContainer = styled.View`
  border: 1px solid black;
  align-self: center;
  border-radius: 8px;
  padding: 4px;
  margin: 4px;
  min-width: 32px;
  background: ${props => props.selected ? 'black' : 'white'}
`

const StyledTagButton = styled.TouchableOpacity`
  
`

const StyledTextButton = styled.Text`
  color:  ${props => props.selected ? 'white' : 'black'}
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`
const TagButton = ({title, selected, handleClick, handleLongPress}) => {

  /* const [isSelected, setIsSelected] = useState(selected)

  const handleClick = () => {

    setIsSelected(!isSelected)
  } */


  
  return (
    <MainContainer selected={selected}>
      <StyledTagButton onPress={handleClick} onLongPress={handleLongPress} >
        <StyledTextButton selected={selected}>{title}</StyledTextButton>
      </StyledTagButton>
    </MainContainer>
  )
}

export default TagButton
