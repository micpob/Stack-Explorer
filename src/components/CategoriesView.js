import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, SafeAreaView, Button } from 'react-native';
import styled from 'styled-components/native'
import CategoryButton from './CategoryButton'
import AllCategoriesButton from './AllCategoriesButton'
import { WebView } from 'react-native-webview';
import React, { Component, useState, useRef, useEffect } from 'react'
import categories from '../utils/categories'


const MainContainer = styled.View`
  position: relative;
  flex: 1;
  display: flex;
  height: 100%;
  width: 100%;
`

const AllCategoriesButtonContainer = styled.View`
  position:absolute;
  z-index: 15;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  justifyContent: center;
  alignItems: center;
  alignSelf: center;
`

const CategoriesView = () => {

  console.log('categories:', categories)

  //const [categories, setCategories] = useState([])

  return (
    <MainContainer >
      <AllCategoriesButtonContainer>
          <AllCategoriesButton></AllCategoriesButton>
      </AllCategoriesButtonContainer>
      {categories.map(category => {
        console.log(category.name)
        return <CategoryButton key={category.name} title={category.name}>
        
        </CategoryButton>
      })}
    </MainContainer>
  )
}

export default CategoriesView