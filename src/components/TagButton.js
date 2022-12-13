import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';


const MainContainer = styled.View`
  border: 1px solid black;
  align-self: center;
  border-radius: 8px;
  padding: 4px;
  margin: 4px;
  background: ${props => props.selected ? 'black' : 'white'}
`

const StyledTagButton = styled.TouchableOpacity`
  
`

const StyledTextButton = styled.Text`
  color:  ${props => props.selected ? 'white' : 'black'}
  font-size: 16px;
`
const TagButton = ({title, selected}) => {

  const [isSelected, setIsSelected] = useState(selected)

  const handleClick = () => {
    setIsSelected(!isSelected)
  }
  
  return (
    <MainContainer selected={isSelected}>
      <StyledTagButton onPress={handleClick} >
        <StyledTextButton selected={isSelected}>{title}</StyledTextButton>
      </StyledTagButton>
    </MainContainer>
  )
}

export default TagButton
