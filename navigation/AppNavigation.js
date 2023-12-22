import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreeen from '../screens/WelcomeScreeen';
import SignupScreen from '../screens/SignupScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import {setUser} from '../redux/slices/user'
import {auth} from '../config/firebase'

const Stack = createStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, u=>{
    console.log('got user:', u);
    dispatch(setUser(u));
  })

  if(user){

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          
            <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
            <Stack.Screen options={{headerShown:false}}  name="AddTrip" component={AddTripScreen} />
            <Stack.Screen options={{headerShown:false}}  name="AddExpense" component={AddExpenseScreen} />
            <Stack.Screen options={{headerShown:false}}  name="TripExpenses" component={TripExpensesScreen} />

        </Stack.Navigator>

      </NavigationContainer>
    );

  }
  else{

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>

            <Stack.Screen options={{headerShown:false, presentation:'modal'}}  name="Login" component={LoginScreen} />
            <Stack.Screen options={{headerShown:false, presentation:'modal'}}  name="Signup" component={SignupScreen} />
            <Stack.Screen options={{headerShown:false}}  name="Welcome" component={WelcomeScreeen} />

        </Stack.Navigator>

      </NavigationContainer>
    );

  }

    
  }