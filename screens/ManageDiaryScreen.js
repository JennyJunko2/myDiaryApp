import { useLayoutEffect } from 'react'
import {ScrollView, Text} from 'react-native'

const ManageDiary = ({route, navigation}) => {
  console.log(route.params)
  const date = route.params ? route.params.date : new Date().toJSON().slice(0, 10)

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: date
    })
  }, [route])
  return (
    <>
      <ScrollView>
      <Text>Manage Diary Page</Text>
      {/* ImagePicker */}
      {/* Text section */}

      </ScrollView>
    </>
  )
}

export default ManageDiary