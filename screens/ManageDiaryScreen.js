import { useLayoutEffect, useState } from 'react'
import {ScrollView, StyleSheet } from 'react-native'
import PhotoPicker from '../components/PhotoPicker'
import TextWritingSection from '../components/TextWritingSection'
import IconButton from '../components/IconButton'

const ManageDiary = ({route, navigation}) => {
  const date = route.params ? route.params.date : new Date().toJSON().slice(0, 10)
  const [textContent, setTextContent] = useState('')
  const [photo, setPhoto] = useState()

  const saveContentHandler = () => {
    // send textContent & photo to database
  }

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: date,
      headerRight: ({tintColor}) => (
        <IconButton
          icon='content-save-edit'
          color={tintColor}
          size={28}
          onPress={saveContentHandler}
        />
        )
    })
  }, [route, saveContentHandler])

  const photoPickHandler = (takenPhoto) => {
    setPhoto(takenPhoto)
  }

  const textContentHandler = (writtenText) => {
    setTextContent(writtenText)
  }


  return (
    <>
      <ScrollView style={styles.scrollViewContainer}>
        <PhotoPicker onPick={photoPickHandler}/>
        <TextWritingSection onWrite={textContentHandler}/>      
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    marginBottom: 10
  }
})

export default ManageDiary