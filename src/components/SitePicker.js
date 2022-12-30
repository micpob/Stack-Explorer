import React, { Component, Fragment, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import ModalSelector from 'react-native-modal-selector'
import colors from '../utils/colors'
import defaultSites from '../utils/defaultSites'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SearchableDropdown from 'react-native-searchable-dropdown'

const MainContainer = styled.View`
  display: flex;
  margin: auto;
  min-width: 60%;
  max-width: 84%;
`
const SitePicker = ({site, setSite, getStoredtags, setTags}) => {

  const onSelect = async (value) => {
    const jsonNewSelectedSite = JSON.stringify(value)
    AsyncStorage.setItem(`site`, jsonNewSelectedSite)
    setSite(value)
    const storedTags = await getStoredtags(value)
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
        backdropPressToClose={true}
        cancelContainerStyle={{display: 'none'}}
        selectStyle={{backgroundColor: 'white', borderColor: 'black', paddingLeft: 12, paddingRight: 12 }}
        /* selectedItemTextStyle={{color: 'black'}} */
      />
    </MainContainer>
  )
}

export default SitePicker
