import { useIsFocused } from '@react-navigation/native';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SliderBox } from 'react-native-image-slider-box';
import monthsDictionary from '../assets/months/monthsDictionary';
import { Colors } from '../constants/colors';
import { getDiaries, getDiaryByDate } from '../utils/database';

const CalendarScreen = ({ navigation }) => {
  const [diaries, setDiaries] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
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
    navigation.navigate('ManageDiary', {
      date: dateData.dateString,
      diaryRecord
    })
  }

  const monthChangeHandler = (dateData) => {
    setSelectedMonth(dateData.month)
    setSelectedYear(dateData.year)
  }

  const convertDiariesToObject = useCallback((data) => {
    let diariesObject = {}
    data.forEach((diary) => {
      diariesObject[diary.written_date] = {marked: true}
    })
    return diariesObject
  },[diaries])

  let imagesForThisMonth
  if (diaries) {
    const formattedMonth = selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth
    imagesForThisMonth = diaries
      .filter((diary) => diary.written_date.startsWith(`${selectedYear}-${formattedMonth}`))
      .map((item) => item.image_uri)
  }

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.imageContainer}>
        {
          imagesForThisMonth.length === 0
            ? <Image style={styles.image} source={monthsDictionary[selectedMonth]}/>
            : <SliderBox
              images={imagesForThisMonth}
              autoplay={true}
              circleLoop={true} // set to 'false' if want to avoid VirtualizedList warning
              ImageComponentStyle={styles.image}
            />
        }
      </View>
      <View style={styles.innerCalendarContainer}>
        <Calendar
          onDayPress={dateClickHandler}
          markedDates={convertDiariesToObject(diaries)}
          onMonthChange={monthChangeHandler}
          theme={{
            backgroundColor: Colors.backgroundColor,
            calendarBackground: Colors.backgroundColor,
            textSectionTitleColor: Colors.primaryGreen,
            todayTextColor: Colors.backgroundColor,
            todayBackgroundColor: Colors.primaryGreen,
            dotColor: Colors.primaryGreen,
            monthTextColor: Colors.primaryGreen,
            textMonthFontWeight: 'bold',
            arrowColor: Colors.primaryGreen
          }}
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
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.8
  },
  innerCalendarContainer: {
    width: '100%'
  }
})

export default CalendarScreen