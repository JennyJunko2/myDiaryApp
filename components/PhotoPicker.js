import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';

const PhotoPicker = ({onPick, initialValue}) => {
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(initialValue)

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

  let photoPreview = (
    <Pressable style={[styles.imagePreviewContainer, styles.border]} onPress={takePhotoHandler}>
      <Text style={styles.previewText}>Let's take today's photo</Text>
      <MaterialCommunityIcons name='camera' color={Colors.primaryGreen} size={30} style={{marginTop: 8}}/>
    </Pressable>
  )

  if (photo) {
    photoPreview = (
      <View style={styles.imagePreviewContainer}>
        <Image source={{uri: photo}} style={styles.image}/>
      </View>
    )
  }

  return (
    <View style={styles.rootContainer}>
      {photoPreview}
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  imagePreviewContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  border: {
    borderWidth: 2,
    borderColor: Colors.primaryGreen,
    borderStyle: 'dashed',
  },
  previewText: {
    fontSize: 16,
    color: Colors.textColor
  }
})

export default PhotoPicker