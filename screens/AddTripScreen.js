import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { addDoc } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'


const AddTripScreen = () => {

    const navigation = useNavigation();
    const [place, setPlace] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state=>state.user);

    const addTrip=async()=>{
        if (place && country){
            // good to go
            // navigation.navigate('Home');
            setLoading(true);
            let doc = await addDoc(tripsRef, {
                place,
                country,
                userId: user.uid,
            });
            setLoading(false);
            if (doc && doc.id){
                navigation.goBack();
            }
        }else{
            //error
            alert('Place and Country are required!')
        }
    }

  return (
    <ScreenWrapper>
      <View style={styles.viewHandler}>
        <View>
            <View style={{position:'relative', marginTop: 5}}>
                <View style={styles.viewHandler2}>
                    <BackButton/>
                </View>
                    <Text style={styles.textHandler}>Add Trip</Text>
                <View style={styles.viewHandler}>
                    <Image style={{width:100, height:100}} source={require('../assets/images/4.png')}/>
                </View>
            </View>
        </View>
      </View>
        <View style={styles.textFighter}>
            <Text style={styles.textHandler2}>Where on Earth!</Text>
            <TextInput value={place} onChangeText={value=>setPlace(value)} style={styles.textInputHandler}/>
            <Text style={styles.textHandler2}>Which Country!</Text>
            <TextInput value={country} onChangeText={value=>setCountry(value)} style={styles.textInputHandler}/>
        </View>
        <View>
            {
                loading ? (
                    <Loading/>
                ):(
                    <TouchableOpacity onPress={addTrip} style={styles.finalTouch}>
                        <Text style={styles.textHandler2}>Add Trip</Text>
                    </TouchableOpacity>
                )
            }
            
        </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
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
    textHandler:{
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 20,

    },
    textHandler2:{
        fontSize:16,
        fontWeight:'bold',
        color: 'gray',
        alignItems: 'center',
        flexDirection: 'row',

    },
    textInputHandler:{
        borderBlockColor: 'orange',
        borderRadius: '15px',
        backgroundColor: 'white',
        padding: 5,
        marginBottom: 3,
    },
    textFighter:{
        justifyContent: 'space-evenly',
        marginHorizontal: 2,
    },
    finalTouch:{
        padding:3, 
        marginHorizontal: 5, 
        shadowColor: 'gray', 
        borderRadius:'20px', 
        backgroundColor: 'lightgreen', 
        alignItems:'center',
        marginTop:10,
    }
})

export default AddTripScreen