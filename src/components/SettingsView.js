import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import styled from 'styled-components/native'
import TagButton from './TagButton'
import AddTagForm from './AddTagForm'
import DeleteTagsButton from './DeleteTagsButton'
import YearPicker from './YearPicker'
import SitePickerSearchable from './SitePickerSearchable'
import AndOrSwitch from './AndOrSwitch'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../utils/colors'
import AddTagsButton from './AddTagsButton'

const MainContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 8px 8px 0px 8px;
  background: ${colors.settingsBackground};
`

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StyledTitle = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: ${colors.primary};
`

const YearSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  flex: 1;
  background: ${colors.settingsBoxBackground};
  padding: 8px;
  border-radius: 8px;
  margin: 8px;
`
const SiteSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: auto;
  flex: 1;
  background: ${colors.settingsBoxBackground};
  padding: 8px;
  border-radius: 8px;
  margin: 8px;
`
const TagsSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin-top: auto;
  flex: 6;
  background: ${colors.settingsBoxBackground};
  padding: 8px;
  padding-top: 2px;
  border-radius: 8px;
  margin: 8px;
`
const TagsContainer = styled.View`
  max-height: 70%;
`
const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 2
  }
})

const SettingsView = ({ allTags, setAllTags, site, setSite, setTags, year, setYear, orOperator, setOrOperator }) => {

  const [deleteTags, setDeleteTags] = useState(false)
  const [showAddTagForm, setShowAddTagForm] = useState(false)
  
  const handleClick = async (tag) => {
    const newAllTags = deleteTags ? allTags.filter(tagObject => tagObject.name !== tag.name) : allTags.map(tagObject => tagObject.name === tag.name ? { name: tagObject.name, selected: !tag.selected} : tagObject)
    const jsonNewTagsArray = JSON.stringify(newAllTags)
    AsyncStorage.setItem(`${site}-tags`, jsonNewTagsArray)
    setAllTags(newAllTags)
    const selectedTags = newAllTags.filter(tagObject => tagObject.selected).map(selectedTagObject => selectedTagObject.name)
    setTags(selectedTags)
  }

  return (

      <MainContainer >
        <YearSection>
          <TitleContainer>
            <StyledTitle>Start from year:</StyledTitle>
            <YearPicker year={year} setYear={setYear}></YearPicker>
          </TitleContainer>
        </YearSection>
        
        <SiteSection>
          <TitleContainer>
            <StyledTitle>Site:</StyledTitle>
            <SitePickerSearchable site={site} setSite={setSite} ></SitePickerSearchable>
          </TitleContainer>
        </SiteSection>

        <TagsSection>
          <TitleContainer>
            <StyledTitle>Tags:</StyledTitle>
            { deleteTags ? <Text>click on a tag to delete it</Text> : <AndOrSwitch orOperator={orOperator} setOrOperator={setOrOperator}></AndOrSwitch> }
            <DeleteTagsButton deleteTags={deleteTags} setDeleteTags={setDeleteTags}></DeleteTagsButton>
          </TitleContainer>
          <TagsContainer >
            <ScrollView persistentScrollbar={true} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={true} >
              {allTags.map(tag => <TagButton key={tag.name} title={tag.name} selected={tag.selected} deleteTags={deleteTags} handleClick={() => handleClick(tag) } ></TagButton>)}
            </ScrollView>
          </TagsContainer>
          <AddTagsButton setShowAddTagForm={setShowAddTagForm}></AddTagsButton>
          {
            showAddTagForm &&
            <AddTagForm site={site} allTags={allTags} setAllTags={setAllTags} setDeleteTags={setDeleteTags} showAddTagForm={showAddTagForm} setShowAddTagForm={setShowAddTagForm}></AddTagForm>
          }
        </TagsSection>
      </MainContainer>
  )
}

export default SettingsView