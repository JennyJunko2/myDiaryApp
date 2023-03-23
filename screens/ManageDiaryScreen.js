import { useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import IconButton from '../components/IconButton'
import PhotoPicker from '../components/PhotoPicker'
import TextWritingSection from '../components/TextWritingSection'
import { createDiary, updateDiary } from '../utils/database'

const ManageDiary = ({route, navigation}) => {
  const date = route.params.date
  const initialValues = {
    diary_id: route.params?.diaryRecord?.diary_id,
    content: route.params?.diaryRecord?.content,
    image_uri: route.params?.diaryRecord?.image_uri
  } 
  const [textContent, setTextContent] = useState(initialValues.content)
  const [photo, setPhoto] = useState(initialValues.image_uri)

  const saveContentHandler = async() => {
    if (initialValues.diary_id) {
      await updateDiary({
        diary_id: initialValues.diary_id,
        content: textContent,
        image_uri: photo,
        happiness_level: 5
      })
    } else {
      await createDiary({
        written_date: date,
        content: textContent,
        image_uri: photo,
        happiness_level: 5
      })
    }

    navigation.navigate('Calendar')
  }

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: date,
      headerRight: ({tintColor}) => (
        <IconButton
          icon='check'
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
        <PhotoPicker onPick={photoPickHandler} initialValue={photo}/>
        <TextWritingSection onWrite={textContentHandler} initialValue={textContent}/>      
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#ffffff'
  }
})

export default ManageDiary