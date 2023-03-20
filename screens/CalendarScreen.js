import { useState } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native'
import { Calendar } from 'react-native-calendars';


const CalendarScreen = ({ navigation }) => {

  const dateClickHandler = (dateData) => {
    navigation.navigate('ManageDiary', {
      date: dateData.dateString
    })
  }

  const monthChangeHandler = (dateData) => {
    // should update the image of the month
  }

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require(`../assets/months/month-3.png`)}/>
      </View>
      <View style={styles.innerCalendarContainer}>
        <Calendar
          onDayPress={dateClickHandler}
          style={styles.calendar}
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