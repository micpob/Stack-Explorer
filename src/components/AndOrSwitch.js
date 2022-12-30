import React, { Component, Fragment, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, Switch, Alert, TouchableOpacity  } from 'react-native';
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

  const handleClick = () => {
    console.log('SWITCH clicked')
    const jsonNewSelectedOrOperator = JSON.stringify(!orOperator)
    AsyncStorage.setItem(`orOperator`, jsonNewSelectedOrOperator)
    setOrOperator(!orOperator)
  }

  const showSwitchInfoModal = () => {
    Alert.alert(
      'And/Or operator',
      `If And is selected, the search will return questions that include ALL of the tags selected.\n\nIf Or is selected, the search will return questions that include at least ONE of the tags selected.`,
      [ ],
      {
        cancelable: true
      }
    ) 
  }

  return (
    <SwitchContainer>
      <Text>and</Text>
      <Switch
        /* trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={orOperator ? "#f5dd4b" : "#F4F4F4"} */
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor="#F4F4F4" 
        onValueChange={ () => { handleClick() } }
        value={ orOperator }
      />
      <Text>or</Text>
      <MaterialCommunityIcons name="message-question" size={22} color={colors.primary} style={{marginLeft: 4}} onPress={showSwitchInfoModal} />
    </SwitchContainer>
  )
}

export default AndOrSwitch
