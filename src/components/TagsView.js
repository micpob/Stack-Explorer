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
const TagsView = ({getStoredtags, site, setSite, tags, setTags}) => {

  //const [allTags, setAllTags] = useState(['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Canvas', 'Node.js', 'PHP', 'SQL', 'MySql', 'GraphQL', 'docker', 'kubernetes', 'SSH', 'FTP', 'AWS', 'nosql', 'mongo', 'mysql', 'postgresql'])
  const [allTags, setAllTags] = useState([])
  console.log('allTags:', allTags)

  useEffect(() => {
    console.log('useEffect')
    const getTags = async () => {
      const storedTags = await getStoredtags()
      setAllTags(storedTags)
    }
    getTags()
  }, [])
  
  const getSelectedTags = async (allTags) => {
    const result = await allTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
    return result
  }

  const handleClick = (tag) => {
    //console.log(tag.name)
    if (tag.selected) {
      const newAllTags = allTags.map(tagObject => tagObject.name === tag.name ? { name: tagObject.name, selected: false} : tagObject)
      const jsonNewTagsArray = JSON.stringify(newAllTags)
      AsyncStorage.setItem(`${site}-tags`, jsonNewTagsArray)
      setAllTags(newAllTags)
      const selectedTags = newAllTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
      setTags(selectedTags)
    } else {
      const selectedTagsCount = allTags.reduce((acc, cur) => cur.selected ? ++acc : acc, 0)
      if (selectedTagsCount > 3) {
        console.log('cant select more than 4 tags at the same time')
      } else {
        const newAllTags = allTags.map(tagObject => tagObject.name === tag.name ? { name: tagObject.name, selected: true} : tagObject)
        const jsonNewTagsArray = JSON.stringify(newAllTags)
        AsyncStorage.setItem(`${site}-tags`, jsonNewTagsArray)
        setAllTags(newAllTags)
        const selectedTags = newAllTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
        setTags(selectedTags)
      }
    }
  }


  return (
    <MainContainer >
       {allTags.map(tag => <TagButton key={tag.name} title={tag.name} selected={tag.selected} handleClick={() => handleClick(tag)} ></TagButton>)}
    </MainContainer>
  )
}

export default TagsView