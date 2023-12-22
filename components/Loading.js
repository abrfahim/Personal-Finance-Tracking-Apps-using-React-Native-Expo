import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'


const Loading = () => {
  return (
    <View style={styles.viewport}>
      <ActivityIndicator size='large' style={styles.btncolor}/>
    </View>
  )
}

const styles = StyleSheet.create({
    viewport:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    btncolor:{
        color: 'orange',
        borderStyle: 'dotted',
    }
})

export default Loading