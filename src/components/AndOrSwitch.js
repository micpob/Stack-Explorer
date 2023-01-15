import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { Text, View, Switch, Alert } from 'react-native';
import colors from '../utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SwitchContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const AndOrSwitch = ({orOperator, setOrOperator}) => {

  const handleClick = (value) => {
    const jsonNewSelectedOrOperator = JSON.stringify(value)
    AsyncStorage.setItem(`orOperator`, jsonNewSelectedOrOperator)
    setOrOperator(value)
  }

  const showSwitchInfoModal = () => {
    Alert.alert(
      'And/Or operator',
      `If And is selected, the search will return questions that include ALL of the tags selected.\n\nIf Or is selected, the search will return questions that include at least ONE of the tags selected.`,
      [ ],
      { cancelable: true }
    ) 
  }

  return (
    <SwitchContainer>
      <Text>and</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor="#F4F4F4" 
        onValueChange={ (value) => { handleClick(value) } }
        value={ orOperator }
        style={{marginVertical: -8}}
        />
      <Text>or</Text>
      <MaterialCommunityIcons name="message-question" size={22} color={colors.primary} style={{marginLeft: 4, padding: 3}} onPress={showSwitchInfoModal} />
    </SwitchContainer>
  )
}

export default AndOrSwitch
