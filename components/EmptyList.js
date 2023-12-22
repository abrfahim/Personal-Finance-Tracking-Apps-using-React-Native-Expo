import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const EmptyList = ({message}) => {
  return (
    <View style={styles.viewHangle}>
        <Image style={styles.imgHandle} source={require('../assets/images/empty.png')} />
      <Text style={styles.textinpu}>{message || 'data not found'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    textinpu:{
        color: 'gray',
        fontSize: 14,
        fontStyle:'italic'
    },
    imgHandle:{
        width:40,
        height:40,
        shadowColor:'gray',
    },
    viewHangle:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        
    }
})

export default EmptyList