import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableOpacity  } from 'react-native';
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

  const onSelect = async (value) => {
    const jsonNewSelectedYear = JSON.stringify(value)
    AsyncStorage.setItem(`year`, jsonNewSelectedYear)
    setYear(value)
  }

  const data = defaultYears['years'].map((yearObj, index) => {
      return { key: index, label: yearObj.name, value: yearObj.value }
    }
  )

  const getInitValue = () => {
    const initValue = defaultYears['years'].find(yearObj => yearObj.value === year)
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
        optionContainerStyle={{backgroundColor: 'white', minWidth: 200, maxWidth: 200, maxHeight: 600 }}  
        optionTextStyle= {{color: colors.primary, fontSize: 22, fontWeight: '600'}}
        animationType='fade'
        backdropPressToClose={true}
        cancelContainerStyle={{display: 'none'}}
        selectStyle={{backgroundColor: 'white', borderColor: 'black', paddingLeft: 12, paddingRight: 12 }}
      />
    </MainContainer>
  )
}

export default YearPicker
