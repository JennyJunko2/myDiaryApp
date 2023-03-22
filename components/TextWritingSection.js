import { useState } from "react"
import { TextInput, View, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native"

const TextWritingSection = ({onWrite, initialValue}) => {
  const [text, setText] = useState(initialValue)

  const textChangeHandler = (value) => {
    setText(value)
    onWrite(value)
  }

  return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          value={text}
          onChangeText={textChangeHandler}
          placeholder="Today, I went to ..."
          multiline
          scrollEnabled={false}
          style={styles.textInput}
        />
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16
  },
  textInput: {
    textAlignVertical: 'auto',
    fontSize: 16,
    // borderBottomColor: 'gray',
    // borderWidth: 1
  }
})

export default TextWritingSection