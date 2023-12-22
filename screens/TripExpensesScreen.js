import { Text, StyleSheet, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EmptyList from '../components/EmptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import BackButton from '../components/BackButton'
import ExpenseCard from '../components/ExpenseCard'
import { getDocs, query, where } from 'firebase/firestore'
import { expensesRef} from '../config/firebase'


const TripExpensesScreen = (props) => {
    
  const {id, place, country} = props.route.params;
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const fetchExpenses=async()=>{
    const que = query(expensesRef, where('tripId', '==', id));
    const queSnapshot = await getDocs(que);
    let data = [];
    queSnapshot.forEach(doc=>{
      console.log('document:',doc.data());
      data.push({...doc.data(), id: doc.id});
    })
    setExpenses(data);
  }

  useEffect(()=>{
    if(isFocused){
      fetchExpenses();
    }
  }, [isFocused])


  return (
    <ScreenWrapper style={{flex:1}}>
        <View style={{position:'relative', marginTop: 5}}>
            <View style={styles.viewHandler2}>
                <BackButton/>
            </View>
                <View>
                <Text style={styles.textHandler}>{place}</Text>
                <Text style={styles.textHandler}>{country}</Text>
                </View>
            <View style={styles.viewHandler}>
                <Image style={{width:100, height:100}} source={require('../assets/images/4.png')}/>
            </View>
        </View>
      <View style={styles.View_Image}>
        <Image source={require('../assets/images/banner.png')} style={{width:60, height:60}}  />
      </View>
      <View style={{paddingHorizontal:5, justifyContent: 'space-evenly'}}>
        <View style={styles.View_Opacity}>
          <Text style={styles.Expensify}>Expenses</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('AddExpense', {id, place, country})} style={styles.Logout_Opacity}>
            <Text style={styles.Expensify}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:700}}>
          <FlatList
            data={expenses}
            // numColumns={2}
            ListEmptyComponent={<EmptyList message={"You haven't recorded any expenses yet"}/>}
            keyExtractor={item=>item.id}
            showsVerticalScrollIndicator={false}
            // columnWrapperStyle={{
            //   justifyContent: 'space-between'
            // }}
            style={{marginHorizontal:1}}
            renderItem={({item})=>{
              return(
                <ExpenseCard item={item}/>
              )
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    Expensify:{
      fontSize: 20,
      fontWeight: 'bold',
    },
    Expensify2:{
      fontSize: 14,
      color: 'orange',
    },
    Expensify3:{
      fontSize: 16,
      fontWeight: 'bold',
      color: 'gray',
    },
    Logout_Opacity:{
      padding:2,
      paddingHorizontal: 15,
      borderBlockColor: 'gray',
      backgroundColor: 'white',
      borderRadius: '15px',
    },
    normal_Opacity:{
      padding:2,
      paddingHorizontal: 20,
      borderRadius: '20px',
      backgroundColor:'lightblue',
    },
    View_Opacity:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: 4,
    },
    View_Image:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'lightblue',
      marginHorizontal: 5,
      marginBottom: 5,
      borderRadius: '25px',

    },
    textHandler:{
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    viewHandler:{
        flexDirection:'row',
        justifyContent:'center',
        height: 'auto',
        marginHorizontal: 5,
    },
    viewHandler2:{
        position: 'relative',
        top: 0,
        left:0,
    },

})

export default TripExpensesScreen