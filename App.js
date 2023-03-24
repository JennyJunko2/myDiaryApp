import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { useEffect } from 'react';
import IconButton from './components/IconButton';
import { Colors } from './constants/colors';
import CalendarScreen from './screens/CalendarScreen';
import ManageDiaryScreen from './screens/ManageDiaryScreen';
import { getDiaryByDate, initializeDB } from './utils/database';

const Stack = createNativeStackNavigator() 

export default function App() {

  useEffect(() => {
    initializeDB()
  }, [])

  const iconClickHandler = async(navigation) => {
    const localToday = new Date().toLocaleDateString('sv-SE')
    const diaryRecord = await getDiaryByDate(localToday)
    navigation.navigate('ManageDiary', {
      date: localToday,
      diaryRecord
    })
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: Colors.primaryGreen,
            headerStyle: {
              backgroundColor: Colors.backgroundColor
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name='Calendar'
            component={CalendarScreen}
            options={({navigation}) => ({
              title: 'Happy Diary',
              headerRight: ({tintColor}) => (
                <IconButton
                  icon='feather'
                  color={tintColor}
                  size={28}
                  onPress={() => iconClickHandler(navigation)}
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

