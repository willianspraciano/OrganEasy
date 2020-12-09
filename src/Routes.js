import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from './components/context'

import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerifyUser from './pages/VerifyUser';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

function Routes() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState('');

  const initialLoginState = {
    isLoading: true,
    userId: null,
    userName: null,
    userEmail: null,
    userToken: null,
  };

  const loginReducer = (prevState, action)=>{
    switch(action.type){
      case 'LOGIN':
        return {
          ...prevState,
          userId: action.id,
          userName: action.name,
          userEmail: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userId: null,
          userName: null,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(()=>({
    signIn: async (userId, userName, userEmail, userToken)=>{
      //alert(userId +" "+userName+" "+userEmail+" "+userToken);
      try {
        await AsyncStorage.setItem('OrganEasy@userToken', userToken);
        await AsyncStorage.setItem('OrganEasy@userId', userId);
        await AsyncStorage.setItem('OrganEasy@userName', userName);
        await AsyncStorage.setItem('OrganEasy@userEmail', userToken);
      }catch(err){console.log(err);}
      dispatch({type: 'LOGIN', id: userId, name: userName, email: userEmail, token: userToken});
    },
    signOut: async ()=>{
      try {
        await AsyncStorage.removeItem('OrganEasy@userToken');
        await AsyncStorage.removeItem('OrganEasy@userId');
        await AsyncStorage.removeItem('OrganEasy@userName');
        await AsyncStorage.removeItem('OrganEasy@userEmail');
      }catch(err){console.log("erro: "+ err);}
      
      dispatch({type: 'LOGOUT'});
    },
    signUp: ()=>{
      dispatch({type: 'REGISTER', email: email, token: userToken});
    },
  }));

  React.useEffect(()=>{
    setTimeout(async()=>{
      let userId = null;
      let userName = null;
      let userEmail = null;
      let userToken = null;
      try {
        userId = await AsyncStorage.getItem('OrganEasy@userId');
        userToken = await AsyncStorage.getItem('OrganEasy@userToken');
        userName = await AsyncStorage.getItem('OrganEasy@userName');
        userEmail = await AsyncStorage.getItem('OrganEasy@userEmail');
        console.log(userId);
        //dispatch({type: 'LOGOUT'});
        dispatch({type: 'LOGIN', id: userId, name: userName, email: userEmail, token: userToken});
      }catch(err){console.log(err);}
    }, 1000);
  },[]);

  if(loginState.isLoading){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          loginState.userToken === null ? (
            <Stack.Navigator 
              initialRouteName="Login"
              screenOptions={{
                headerTitleAlign:'center', 
                headerTintColor: '#FFF',
                headerShown: true,
                headerStyle:{ backgroundColor: '#40C0E7'},
                headerBackTitleVisible: false,
              }}
            >
              <Stack.Screen 
                name="Login" 
                options={{headerShown: false}}
                component={Login} 
              />
              <Stack.Screen 
                name="SignUp" 
                component={SignUp} 
              />
              <Stack.Screen 
                name="VerifyUser"
                component={VerifyUser} 
              />
            </Stack.Navigator>
          ):(
            <Stack.Navigator 
              initialRouteName="Main"
              screenOptions={{
                headerTitleAlign:'center', 
                headerTintColor: '#FFF',
                headerShown: true,
                headerStyle:{ backgroundColor: '#40C0E7'},
                headerBackTitleVisible: false,
              }}
            >
              <Stack.Screen 
                name="Main" 
                component={Main} 
              />
            </Stack.Navigator>
          )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default Routes;