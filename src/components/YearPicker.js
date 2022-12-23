import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import defaultYears from '../utils/defaultYears'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainContainer = styled.View`
  display: flex;
  flex: 1;
  margin-right: auto;
`

const StyledText = styled.Text`
  font-size: ${props => props.selected ? '32px' : '24px'};
  opacity: ${props => props.selected ? '1' : '0.5'};
  font-weight: 600;
  text-align: center;
`
const YearPicker = ({year, setYear}) => {

  //console.log('years:', defaultYears)

  const onSelect = (value) => {
    const newSelectedYear = defaultYears['years'].find(year => year.value === value)
    const jsonNewSelectedYear = JSON.stringify(newSelectedYear)
    AsyncStorage.setItem(`year`, jsonNewSelectedYear)
    setYear(newSelectedYear)
  }

  return (
    <MainContainer>
      <Picker
        //mode='dropdown'
        selectedValue={year.value}
        onValueChange={(value, index) => { onSelect(value) }
        }>
        {defaultYears['years'].map(yearObj => <Picker.Item style={{fontSize: 24, fontWeight: 600}} key={yearObj.label} label={yearObj.label} value={yearObj.value} />)}  
      </Picker>
    </MainContainer>
  )
}

export default YearPicker
