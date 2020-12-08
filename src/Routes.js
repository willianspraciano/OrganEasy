import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VerifyUser from './pages/VerifyUser';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
        <Stack.Screen 
          name="Main" 
          component={Main} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;