import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CalendarScreen from './screens/CalendarScreen';
import ManageDiaryScreen from './screens/ManageDiaryScreen'
import IconButton from './components/IconButton';
import { useEffect } from 'react';
import { initializeDB } from './utils/database';

const Stack = createNativeStackNavigator() 


export default function App() {

  useEffect(() => {
    initializeDB()
  }, [])

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Calendar'
            component={CalendarScreen}
            options={({navigation}) => ({
              title: 'Happy Days',
              headerRight: ({tintColor}) => (
                <IconButton
                  icon='feather'
                  color={tintColor}
                  size={28}
                  onPress={() => {navigation.navigate('ManageDiary')}}
                />
                )
            })}
            />
          <Stack.Screen
            name='ManageDiary'
            component={ManageDiaryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
