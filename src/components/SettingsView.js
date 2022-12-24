import { StyleSheet, Text, View, Platform, SafeAreaView, Button, Alert } from 'react-native';
import styled from 'styled-components/native'
import TagButton from './TagButton'
import AddTagForm from './AddTagForm'
import DeleteTagsButton from './DeleteTagsButton'
import YearPicker from './YearPicker'
import SitePicker from './SitePicker'
import React, { Component, useState, useRef, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notifier, Easing, NotifierComponents  } from 'react-native-notifier';

const MainContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 8px 4px 0px 4px;
  margin: 15px 4px 0px 4px;
`

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`

const StyledTitle = styled.Text`
  font-size: 25px;
  font-weight: 600;
`

const YearSection = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
`
const SiteSection = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
`
const TagsSection = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;
`
const TagsContainer = styled.ScrollView`
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center; */
  max-height: 65%;
  margin: 2px;
`
const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
})


  const [allTags, setAllTags] = useState([])
  const [deleteTags, setDeleteTags] = useState(false)
  
  //console.log('allTags:', allTags)

  useEffect(() => {
    console.log('useEffect from SettingView')
    const getTags = async () => {
      const storedTags = await getStoredtags()
      setAllTags(storedTags)
    }
    getTags()
  }, [site])
  
  const getSelectedTags = async (allTags) => {
    const result = await allTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
    return result
  }

  const handleClick = (tag) => {
    if (deleteTags) {
      const newAllTags = allTags.filter(tagObject => tagObject.name !== tag.name)
      const jsonNewTagsArray = JSON.stringify(newAllTags)
      AsyncStorage.setItem(`${site}-tags`, jsonNewTagsArray)
      setAllTags(newAllTags)
      const selectedTags = newAllTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
      setTags(selectedTags)
    } else {
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

      <YearSection>
        <TitleContainer>
          <StyledTitle>Questions since:</StyledTitle>
          <YearPicker year={year} setYear={setYear}></YearPicker>
        </TitleContainer>
      </YearSection>
      
      <SiteSection>
        <TitleContainer>
          <StyledTitle>On site:</StyledTitle>
          <SitePicker site={site} setSite={setSite}></SitePicker>
        </TitleContainer>
      </SiteSection>

      <TagsSection>
        <TitleContainer>
          <StyledTitle>Tags:</StyledTitle>
          {deleteTags && <Text>click on a tag to delete it</Text>}
          <DeleteTagsButton deleteTags={deleteTags} setDeleteTags={setDeleteTags}></DeleteTagsButton>
        </TitleContainer>
        <TagsContainer >
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {allTags.map(tag => <TagButton key={tag.name} title={tag.name} selected={tag.selected} deleteTags={deleteTags} handleClick={() => handleClick(tag) } ></TagButton>)}
          </ScrollView>
        </TagsContainer>
        <AddTagForm site={site} allTags={allTags} setAllTags={setAllTags} setDeleteTags={setDeleteTags} ></AddTagForm>
      </TagsSection>
      
    </MainContainer>
  )
}

export default SettingsView