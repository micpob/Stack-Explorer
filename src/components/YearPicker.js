import React, { Component, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import defaultYears from '../utils/defaultYears'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalSelector from 'react-native-modal-selector'
import colors from '../utils/colors'

const MainContainer = styled.View`
  display: flex;
  margin: auto;
  min-width: 35%;
`
const StyledText = styled.Text`
  font-size: ${props => props.selected ? '32px' : '24px'};
  opacity: ${props => props.selected ? '1' : '0.5'};
  font-weight: 600;
`
const YearPicker = ({year, setYear}) => {

  //console.log('years:', defaultYears)

  const onSelect = async (value) => {
    console.log('onSlect')
    const jsonNewSelectedYear = JSON.stringify(value)
    console.log('jsonNewSelectedYear:', jsonNewSelectedYear)
    AsyncStorage.setItem(`year`, jsonNewSelectedYear)
    setYear(value)
  }

  //console.log('defaultYears[]', defaultYears['years'])

  const data = defaultYears['years'].map((yearObj, index) => {
      return { key: index, label: yearObj.name, value: yearObj.value }
    }
  )

  const getInitValue = () => {
    const initValue = defaultYears['years'].find(yearObj => yearObj.value === year)
    //console.log('initvalue:', initValue)
    return initValue.name
  }

  return (
    <MainContainer>
      <ModalSelector
        data={data}
        initValue={getInitValue()}
        onChange={(option)=> { onSelect(option.value) }}
        initValueTextStyle={{color: 'black', fontSize: 20, fontWeight: '600'}}
        overlayStyle={{flex: 1, padding: '5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)'}}    
        optionContainerStyle={{backgroundColor: 'white', minWidth: '80%', maxWidth: '90%', maxHeight: 600 }}  
        optionTextStyle= {{color: colors.primary, fontSize: 22, fontWeight: '600'}}
        animationType='fade'
        backdropPressToClose={true}
        cancelContainerStyle={{display: 'none'}}
        selectStyle={{backgroundColor: 'white', borderColor: 'black', paddingLeft: 12, paddingRight: 12 }}
      />
      {/* <Picker
        selectedValue={year}
        onValueChange={(value, index) => { onSelect(value) }
        }>
        {defaultYears['years'].map(yearObj => <Picker.Item style={{fontSize: 22, color: 'black'}} key={yearObj.name} label={yearObj.name} value={yearObj.value} />)}  
      </Picker> */}
    </MainContainer>
  )
}

export default YearPicker
