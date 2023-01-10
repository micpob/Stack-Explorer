import React, { useState, useRef, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput  } from 'react-native'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalSelector from 'react-native-modal-selector-searchable'
import defaultSites from '../utils/defaultSites'
import colors from '../utils/colors'

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

  /* const data = defaultSites['sites'].map((siteObj, index) => {
      return { key: index, label: siteObj.name, value: siteObj.value }
    }
  ) */

  const data = React.useMemo(()=> defaultSites['sites'].map((siteObj, index) => {
    return { key: index, label: siteObj.name, value: siteObj.value }
  }),[defaultSites['sites']])

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
        optionContainerStyle={{backgroundColor: 'white', width: 300, maxHeight: 600 }}  
        optionTextStyle= {{color: colors.primary, fontSize: 22, fontWeight: '600'}}
        animationType='fade'
        selectStyle={{backgroundColor: 'white', borderColor: 'black', paddingLeft: 12, paddingRight: 12 }}
        cancelContainerStyle={{alignItems: 'center', marginTop: 8}}
        cancelText='CANCEL'
        cancelStyle={{backgroundColor: colors.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8, borderRadius: 4}}
        cancelTextStyle={{fontSize: 20, fontWeight: '600', color: 'white'}}
        listType='FLATLIST'
      />
    </MainContainer>
  )
}

export default SitePickerSearchable
