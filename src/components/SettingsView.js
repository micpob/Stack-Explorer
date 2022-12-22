import { StyleSheet, Text, View, Platform, SafeAreaView, Button, Alert } from 'react-native';
import styled from 'styled-components/native'
import TagButton from './TagButton'
import AddTagForm from './AddTagForm'
import React, { Component, useState, useRef, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notifier, Easing, NotifierComponents  } from 'react-native-notifier';

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: auto;
  align-self: flex-end;
  padding: 8px;
`

const StyledTitle = styled.Text`
  width: 100%;
  font-size: 25px;
  font-weight: 600;
`
const SettingsView = ({getStoredtags, site, setSite, tags, setTags}) => {

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
        Alert.alert(
          "Too many tags",
          "Can't select more than 4 tags at the same time",
          [ ],
          {
            cancelable: true
          }
          ) */
          Notifier.showNotification({
            translucentStatusBar: true,
            title: `Too many tags selected`,
            description: `Max. 4 tags selected at the same time`,
            duration: 2500,
            showAnimationDuration: 500,
            Component: NotifierComponents.Notification,
            componentProps: {
              titleStyle: {color: 'white', fontSize: 24, fontWeight: '600'},
              descriptionStyle: {color: 'white', fontSize: 16, fontWeight: '600'},
              containerStyle: {backgroundColor: 'orange'}
            }, 
            /* showEasing: Easing.bounce, */
            /* onHidden: () => console.log('Hidden'),
            onPress: () => console.log('Press'), */
            hideOnPress: true,
          })
          console.log('Max. 4 tags selected at the same time')
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

  const handleLongPress = (tag) => {

  }


  return (
    <MainContainer >
      <StyledTitle>TAGS:</StyledTitle>
      {allTags.map(tag => <TagButton key={tag.name} title={tag.name} selected={tag.selected} handleClick={() => handleClick(tag) } handleLongPress={() => handleLongPress(tag) }></TagButton>)}
      <AddTagForm site={site} allTags={allTags} setAllTags={setAllTags}></AddTagForm>
    </MainContainer>
  )
}

export default SettingsView