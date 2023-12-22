import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import {setUserLoading} from '../redux/slices/user'


const LoginScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {userLoading} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const addLogin=async()=>{
        if (email && password){
            // good to go
            // navigation.goBack();
            // navigation.navigate('Home');
            try{
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth, email , password);
                dispatch(setUserLoading(false));
            }catch(e){
                
                dispatch(setUserLoading(false));
                alert(e);
            }
            
        }else{
            //error
           alert('Wrong email or password!')
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
                    <Text style={styles.textHandler}>Login</Text>
                <View style={styles.viewHandler}>
                    <Image style={{width:100, height:100}} source={require('../assets/images/login.png')}/>
                </View>
            </View>
        </View>
      </View>
        <View style={styles.textFighter}>
            <Text style={styles.textHandler2}>Email</Text>
            <TextInput value={email} onChangeText={value=>setEmail(value)} style={styles.textInputHandler}/>
            <Text style={styles.textHandler2}>Password</Text>
            <TextInput value={password} secureTextEntry onChangeText={value=>setPassword(value)} style={styles.textInputHandler}/>
        </View>
        <View>
            <TouchableOpacity onPress={addLogin} style={styles.finalTouch}>
                <Text style={styles.textHandler2}>Login</Text>
            </TouchableOpacity>
        </View>
        <View>
            {
                userLoading ? (
                    <Loading  />
                ) : (
                    <TouchableOpacity onPress={addLogin} style={styles.finalTouch}>
                        <Text style={styles.textHandler2}>Forget Password!</Text>
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

export default LoginScreen;