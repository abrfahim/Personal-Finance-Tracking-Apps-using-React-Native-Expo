import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../costants/category'
import Loading from '../components/Loading'
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'


const AddTripScreen = (props) => {

    let {id} = props.route.params;
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false)

    const addExpense=async(props)=>{
        if (title && amount && category){
            // good to go
            // navigation.goBack();
            setLoading(true);
            let doc = await addDoc(expensesRef, {
              title,
              amount,
              category,
              tripId: id,
            })
            setLoading(false);
            if (doc && doc.id){
              navigation.goBack();
            }
        }else{
            //error
            alert('Please, fill all the fields!')
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
                    <Text style={styles.textHandler}>Add Expense</Text>
                <View style={styles.viewHandler}>
                    <Image style={{width:100, height:100}} source={require('../assets/images/expenseBanner.png')}/>
                </View>
            </View>
        </View>
      </View>
        <View style={styles.textFighter}>
            <Text style={styles.textHandler2}>For What?</Text>
            <TextInput value={title} onChangeText={value=>setTitle(value)} style={styles.textInputHandler}/>
            <Text style={styles.textHandler2}>How Much?</Text>
            <TextInput value={amount} onChangeText={value=>setAmount(value)} style={styles.textInputHandler}/>
        </View>
        <View style={{marginHorizontal:2, }}>
          <Text style={styles.textHandler2}>Category</Text>
          <View style={styles.viewHandler}>
            {
              categories.map(cat=>{
                let bgColor= 'white';
                if (cat.value==category){
                  bgColor = 'lightgreen';
                }
                return(
                  <TouchableOpacity onPress={()=>setCategory(cat.value)} key={cat.value} style={styles.finalTouch} >
                    <Text>
                      {cat.value}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
        <View>

        {
                loading ? (
                    <Loading  />
                ) : (
                  <TouchableOpacity onPress={addExpense} style={styles.finalTouch}>
                      <Text style={styles.textHandler2}>Add Expense</Text>
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