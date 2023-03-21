import { useState } from 'react'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import IconButton from './IconButton'

const PhotoPicker = ({onPick}) => {
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null)

  const checkPermission = async() => {
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const statusResponse = await requestPermission() // show pop up to ask user to allow
      return statusResponse.granted
    }

    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Permission is denied',
        'Please grant the permission.'
      )
      return false
    }

    return true
  }
  const takePhotoHandler = async() => {
    const permissionGranted = await checkPermission()

    if (permissionGranted) {
      const photo = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16,9],
        quality: 0.5
      })
  
      if (photo.canceled) {
        return
      }

      setPhoto(photo.assets[0].uri)
      onPick(photo.assets[0].uri)
    }

    return

  }

  let photoPreview = <Text>Let's take today's photo</Text>

  if (photo) {
    photoPreview = <Image source={{uri: photo}} style={styles.image}/>
  }

  return (
    <View>
      <View style={styles.imagePreviewContainer}>
        {photoPreview}
        <IconButton icon='camera' color='blue' size={24} onPress={takePhotoHandler}/>
      </View>
      <Image />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreviewContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 24
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

export default PhotoPicker