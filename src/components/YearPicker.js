import React from 'react'
import { Text, View, TouchableOpacity  } from 'react-native'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalSelector from 'react-native-modal-selector-searchable'
import defaultYears from '../utils/defaultYears'
import colors from '../utils/colors'

const MainContainer = styled.View`
  display: flex;
  margin: auto;
  min-width: 35%;
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
        search={false}
        data={data}
        initValue={getInitValue()}
        onChange={(option)=> { onSelect(option.value) }}
        initValueTextStyle={{color: 'black', fontSize: 20, fontWeight: '500'}}
        overlayStyle={{flex: 1, padding: '5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)'}}    
        optionContainerStyle={{backgroundColor: 'white', minWidth: 200, maxWidth: 200, maxHeight: 600 }}  
        optionTextStyle= {{color: colors.primary, fontSize: 22, fontWeight: '500'/* , fontFamily: 'Montserrat' */}}
        animationType='fade'
        selectStyle={{backgroundColor: 'white', borderColor: 'black', paddingLeft: 12, paddingRight: 12 }}
        cancelContainerStyle={{alignItems: 'center', marginTop: 8}}
        cancelText='CANCEL'
        cancelStyle={{backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8, borderRadius: 4}}
        cancelTextStyle={{fontSize: 20, fontWeight: '500', color: 'white'}}
      />
    </MainContainer>
  )
}

export default YearPicker
