import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity, Text } from 'react-native'

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
const AddTagsButton = ({setShowAddTagForm, }) => {

  const [showText, setShowText] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((showText) => !showText)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClick = async () => {
    setShowAddTagForm(true)
  }

  return (
    <MainContainer >
      <StyledAddTagsButton onPress={handleClick} >
        <StyledBlinkingText showText={showText}>|</StyledBlinkingText><StyledTextButton>Add new tag...</StyledTextButton>
      </StyledAddTagsButton>
    </MainContainer>
  )
}

export default AddTagsButton
