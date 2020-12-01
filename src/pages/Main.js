import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button} from 'react-native-paper';
import {clearAsyncStorage} from '../asyncStorage/index';

const Main = ({navigation}) => {

  /** Firebase logout */
  const LogOutUser = async () => {
    //
  };

  //** handle logout */
  const logOut = ()=>{
    // LogOutUser()
    //   .then(()=>{
    //     clearAsyncStorage()
    //     .then(()=>{
    //       navigation.replace('Login');
    //     })
    //     .catch((err)=>{alert(err)});
    //   })
    //   .catch((err)=>{alert(err)});
  }

  return (
    <View>
      <Text>Main</Text>
      <Button 
        mode="contained"
        dark={true}
        onPress={() => logOut()}
      >
        Sair
      </Button>
    </View>
  );
}

export default Main;