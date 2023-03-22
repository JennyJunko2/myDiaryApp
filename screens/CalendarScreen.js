import { useCallback, useLayoutEffect, useState } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native'
import { Calendar } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native'
import { getDiaries, getDiaryByDate } from '../utils/database';

const CalendarScreen = ({ navigation }) => {
  const [diaries, setDiaries] = useState([])
  const isFocused = useIsFocused()

  useLayoutEffect(() => {
    const fetchAllData = async() => {
      const data = await getDiaries()
      setDiaries(data)
    }
    if (isFocused) {
      fetchAllData()
    }
  }, [isFocused])

  const dateClickHandler = async(dateData) => {
    const diaryRecord = await getDiaryByDate(dateData.dateString)
    console.log('inside:', diaryRecord)
    navigation.navigate('ManageDiary', {
      date: dateData.dateString,
      diaryRecord
    })
  }

  const monthChangeHandler = (dateData) => {
    // should update the image of the month
  }

  const convertDiariesToObject = useCallback((data) => {
    let diariesObject = {}
    data.forEach((diary) => {
      diariesObject[diary.written_date] = {marked: true}
    })
    return diariesObject
  },[diaries])

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require(`../assets/months/month-3.png`)}/>
      </View>
      <View style={styles.innerCalendarContainer}>
        <Calendar
          onDayPress={dateClickHandler}
          style={styles.calendar}
          markedDates={convertDiariesToObject(diaries)}
          onMonthChange={(dateData) => console.log('month:', dateData.month)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  innerCalendarContainer: {
    width: '100%'
  },
  calendar: {
    // width: '100%'
  }
})

export default CalendarScreen