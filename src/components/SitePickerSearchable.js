import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableOpacity, TextInput  } from 'react-native';
import ModalSelector from 'react-native-modal-selector-searchable'
import colors from '../utils/colors'
import defaultSites from '../utils/defaultSites'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainContainer = styled.View`
  display: flex;
  margin: auto;
  min-width: 60%;
  max-width: 84%;
`

const SitePickerSearchable = ({site, setSite, getStoredTags, setTags}) => {

  const onSelect = async (value) => {
    const jsonNewSelectedSite = JSON.stringify(value)
    AsyncStorage.setItem(`site`, jsonNewSelectedSite)
    setSite(value)
    const storedTags = await getStoredTags(value)
    const selectedTags = storedTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
    setTags(selectedTags)
  }

  const data = defaultSites['sites'].map((siteObj, index) => {
      return { key: index, label: siteObj.name, value: siteObj.value }
    }
  )

  const getInitValue = () => {
    const initValue = defaultSites['sites'].find(siteObj => siteObj.value === site)
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
        selectStyle={{backgroundColor: 'white', borderColor: 'black', paddingLeft: 12, paddingRight: 12 }}
        cancelContainerStyle={{/* display: 'none' */ alignItems: 'center', marginTop: 8}}
        cancelText='CANCEL'
        cancelStyle={{backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8, borderRadius: 4}}
        cancelTextStyle={{fontSize: 20, fontWeight: '600', color: 'white'}}
      />
    </MainContainer>
  )
}

export default SitePickerSearchable