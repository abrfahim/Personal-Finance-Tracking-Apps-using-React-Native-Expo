import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ExpenseCard = ({item}) => {
  return (
    <View style={styles.parent_view}>
      <View>
        <Text style={styles.textHandler}>{item.title}</Text>
        <Text style={styles.textHandler}>{item.category}</Text>
      </View>
      <View>
        <Text>BDT {item.amount}</Text>
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
    parent_view:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
        marginBottom: 3,
        backgroundColor: 'lightgreen',
        borderRadius: '15px',
        paddingHorizontal: '5px',
    },
    textHandler:{
        textAlign:'left',
        fontWeight: 'bold',
        fontSize: 15,
    },
})

export default ExpenseCard