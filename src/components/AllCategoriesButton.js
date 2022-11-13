import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';


/* import Popup from './Popup' */


/* const StyledAllCategoriesButton = styled.button`
  font-size: 3em;
  display: block;
  width: 130px;
  height: 130px;
  background: black;
  border: 4px solid white;
  border-radius: 50%;
  cursor: pointer;
  color: white;
` */

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 130px;
  background: black;
  border-radius: 50%;
`

const StyledAllCategoriesButton = styled.TouchableOpacity`
  
  
`

const StyledTextButton = styled.Text`
  color: white;
  font-size: 33px;
`

/* const StyledShareIcon = styled(BiShare)`
  font-size: 1em;
  vertical-align: text-top;
  cursor: pointer;
  color: black;
`

const PopupAlert = styled.div`
  position:absolute;
  left: 55px;
  top: 0;
  background-color: #009688;
  border-radius: 4px;
  color: white;
  padding: 3px 5px;
`
 */
const AllCategoriesButton = ({}) => {

  const handleClick = () => {
  }

  return (
    <MainContainer>
      <StyledAllCategoriesButton onClick={handleClick}>
        <StyledTextButton>ALL</StyledTextButton>
      </StyledAllCategoriesButton>
    </MainContainer>
  )
}

export default AllCategoriesButton
