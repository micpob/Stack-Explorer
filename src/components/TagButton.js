import React from 'react'
import { Text, View, TouchableOpacity  } from 'react-native'
import styled from 'styled-components/native'
import colors from '../utils/colors'

const MainContainer = styled.View`
  border: 1px solid black;
  border-color: ${props => props.deleteTags ? 'white' : props.selected ? colors.primary : 'black'};
  align-self: center;
  border-radius: 8px;
  padding: 4px;
  margin: 4px;
  min-width: 32px;
  background: ${props => props.deleteTags ? colors.deleteMain : props.selected ? colors.primary : 'white'};
`

const StyledTagButton = styled.TouchableOpacity`
`

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: ${props => props.deleteTags ? 'white' : props.selected ? 'white' : 'black'};
`
const TagButton = ({title, selected, deleteTags, handleClick}) => {

  return (
    <MainContainer selected={selected} deleteTags={deleteTags}>
      <StyledTagButton onPress={handleClick} >
        <StyledText selected={selected} deleteTags={deleteTags}>{title}</StyledText>
      </StyledTagButton>
    </MainContainer>
  )
}

export default TagButton
