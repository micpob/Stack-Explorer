import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';


const MainContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  flex: 1;
  background: green;
  border: 1px solid black;
  
`

const StyledCategoryButton = styled.TouchableOpacity`
  
`

const StyledTextButton = styled.Text`
  color: white;
  font-size: 33px;
`
const CategoryButton = ({title}) => {
  const handleClick = () => {

  }
  
  return (
    <MainContainer>
      <StyledCategoryButton onPress={handleClick} >
        <StyledTextButton>{title}</StyledTextButton>
      </StyledCategoryButton>
    </MainContainer>
  )
}

export default CategoryButton
