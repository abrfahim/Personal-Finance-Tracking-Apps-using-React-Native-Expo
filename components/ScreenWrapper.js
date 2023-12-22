import { View, Platform } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const ScreenWrapper = ({children}) => {
    const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight: Platform.OS=='ios'?30:20;
  return (
    <View style={{paddingTop: statusBarHeight}}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper