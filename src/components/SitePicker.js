import React, { Component, Fragment, useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Platform, SafeAreaView, Button, TouchableOpacity  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import defaultSites from '../utils/defaultSites'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SearchableDropdown from 'react-native-searchable-dropdown'

const MainContainer = styled.View`
  display: flex;
  flex: 1;
  margin-right: auto;
  font-family: 'Montserrat-Medium';
`
const SitePicker = ({site, setSite}) => {

  const onSelect = (value) => {
    const jsonNewSelectedSite = JSON.stringify(value)
    AsyncStorage.setItem(`site`, jsonNewSelectedSite)
    setSite(value)
  }

  return (
    <MainContainer>
      <Picker
        //mode='dropdown'
        selectedValue={site}
        onValueChange={(value, index) => { onSelect(value) }
        }>
        {defaultSites['sites'].map(site => <Picker.Item style={{fontFamily: 'Montserrat-Medium', fontSize: 24, fontWeight: 600}} key={site} label={site} value={site} />)}  
      </Picker>
    </MainContainer>
  )
}

export default SitePicker
