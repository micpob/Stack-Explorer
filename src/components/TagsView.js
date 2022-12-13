import { StyleSheet, Text, View, Platform, SafeAreaView, Button } from 'react-native';
import styled from 'styled-components/native'
import TagButton from './TagButton'
import React, { Component, useState, useRef, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  margin-top: 45px;
`
const TagsView = ({}) => {

  const [allTags, setAllTags] = useState(['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Canvas', 'Node.js', 'PHP', 'SQL', 'MySql', 'GraphQL', 'docker', 'kubernetes', 'SSH', 'FTP', 'AWS', 'nosql', 'mongo', 'mysql', 'postgresql'])
  console.log('allTags:', allTags)

  let storedTags = AsyncStorage.getItem('tags')
  console.log('storedTags:', storedTags)
  if (storedTags != 'undefined' && storedTags.length > 0) {
    storedTags = JSON.parse(storedTags)
    setAllTags(storedTags)
  }

  return (
    <MainContainer >
       {allTags.map(tag => <TagButton key={tag} title={tag} selected={true} ></TagButton>)}
    </MainContainer>
  )
}

export default TagsView