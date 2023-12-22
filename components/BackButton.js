import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {ChevronDoubleLeftIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const BackButton = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.touchHandler}>
        <ChevronDoubleLeftIcon size="30" color="orange" />
    </TouchableOpacity>
  )
}

const styles= StyleSheet.create({
    touchHandler:{
        backgroundColor: 'white',
        borderBlockColor:'gray',
        borderRadius: '15px',
        height: 25,
        width: 25,
        alignItems: 'center',
    }
})

export default BackButton