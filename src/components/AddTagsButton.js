import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../utils/colors'
import { Entypo } from '@expo/vector-icons'

const MainContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
`

const StyledAddTagsButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  width: 275px;
  border-width: 1px;
  border-radius: 4px;
  padding: 8px;
  background: white;
  margin: auto;
`
const StyledTextButton = styled.Text`
  color: gray;
`

const StyledBlinkingText = styled.Text`
  color: black;
  margin-bottom: 5px;
  opacity: ${props => props.showText ? 1 : 0};
`
const AddTagsButton = ({showAddTagForm, setShowAddTagForm, }) => {

  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  const handleClick = async () => {
    setShowAddTagForm(true)
  }

  const handleLongClick = async () => {

  }
  
  return (
    <MainContainer >
      <StyledAddTagsButton onPress={handleClick} onLongPress={handleLongClick} >
        {/* <Ionicons name="add-circle-outline" size={32} color="black" /> */}
        {/* <Entypo name="add-to-list" size={24} color="black" /> */}
        {/* <Ionicons name="add" size={24} color="black" /> */}
        <StyledBlinkingText showText={showText}>|</StyledBlinkingText><StyledTextButton>Add new tag... </StyledTextButton>
      </StyledAddTagsButton>
    </MainContainer>
  )
}

export default AddTagsButton
