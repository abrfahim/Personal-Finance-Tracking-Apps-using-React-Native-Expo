import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreeen = () => {
    const navigation = useNavigation();
  return (
    <ScreenWrapper>
        <View style={styles.parent_view}>
            <View>
                <Image source={require('../assets/images/welcome.gif')} style={{height:150, width:150, alignItems: 'center'}}/>
            </View>
            <View style={styles.child_view}>
                <Text style={styles.fst_text}>Finaco</Text>
                <Text style={styles.sec_text}>Your Next Manager!</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.btn_opacity}>
                    <Text style={styles.btn_text}>Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.sec_text}>You haven't an account? Don't worry!</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={styles.btn_opacity}>
                    <Text style={styles.btn_text}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    parent_view:{
        height: 'auto',
        justifyContent: 'space-around',
    },
    child_view:{
        marginHorizontal:5,
        marginBottom: 20,
        justifyContent: 'center',
        flexDirection:'column',
        marginTop: 10,
    },
    fst_view:{
        flexDirection:'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    fst_text:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 10,
        justifyContent: 'center',
    },
    sec_text:{
        fontWeight: 'normal',
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 5,
        justifyContent: 'center',
    },
    btn_text:{
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    btn_opacity:{
        backgroundColor: 'lightgreen',
        borderRadius: '15px',
        alignItems: 'center',
        padding: '5px',
        marginBottom: 3,
    }
})


export default WelcomeScreeen