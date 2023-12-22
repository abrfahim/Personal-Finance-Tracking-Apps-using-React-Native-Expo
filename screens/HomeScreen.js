import { Text, StyleSheet, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/EmptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import {  getDocs, query, where } from 'firebase/firestore'


const HomeScreen = () => {
  const {user} = useSelector(state=>state.user);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips=async()=>{
    const que = query(tripsRef, where('userId', '==', user.uid));
    const queSnapshot = await getDocs(que);
    let data = [];
    queSnapshot.forEach(doc=>{
      console.log('document:',doc.data());
      data.push({...doc.data(), id: doc.id});
    })
    setTrips(data);
  }

  useEffect(()=>{
    if(isFocused){
      fetchTrips();
    }
  }, [isFocused])


  const navigation = useNavigation();
  const logout=async()=>{
    await signOut(auth);
  }
  return (
    <ScreenWrapper style={{flex:1}}>
      <View style={styles.View_Opacity}>
        <Text style={styles.Expensify}>Expensify</Text>
        <TouchableOpacity onPress={logout} style={styles.Logout_Opacity}>
          <Text style={styles.Expensify}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.View_Image}>
        <Image source={require('../assets/images/banner.png')} style={{width:60, height:60}}  />
      </View>
      <View style={{paddingHorizontal:5, justifyContent: 'space-evenly'}}>
        <View style={styles.View_Opacity}>
          <Text style={styles.Expensify}>Recent View</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('AddTrip')} style={styles.Logout_Opacity}>
            <Text style={styles.Expensify}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:700}}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={"You haven't recorded any trip yet"}/>}
            keyExtractor={item=>item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            style={{marginHorizontal:1}}
            renderItem={({item})=>{
              return(
                <TouchableOpacity onPress={()=>navigation.navigate('TripExpenses',{...item})} style={styles.normal_Opacity}>
                  <View>
                    <Image source={randomImage()} style={{height:50, width:50, marginBottom: 2}}/>
                    <Text style={styles.Expensify3}>{item.place}</Text>
                    <Text style={styles.Expensify2}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
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

})

export default HomeScreen