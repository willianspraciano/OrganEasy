import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, Animated, Keyboard, Alert } from 'react-native';
import { TextInput, Button} from 'react-native-paper';

import {setAsyncStorage, keys, getAsyncStorage} from '../asyncStorage/index';

const Login = ({ navigation }) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /** Efeitos de animação da logo */
  const [logo, setLogo] = React.useState(new Animated.ValueXY({x: 250, y: 100}));
  
  useEffect(()=>{
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  },[]);

  function keyboardDidShow () {
    //Alert.alert("Teclado apareceu");
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 100,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 35,
        duration: 100,
        useNativeDriver: false,
      })
    ]).start();
  }

  function keyboardDidHide () {
    //Alert.alert("Teclado oculto");
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 250,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 100,
        duration: 100,
        useNativeDriver: false,
      })
    ]).start();
  }

  //** Fim dos efeitos de animação */

  //**Firebase Login Request*/
  const loginRequest = async (email, password) =>{
    //
  };

  const handleLogin = async (email, password) => {
    if(!email){
      Alert.alert("Atenção", "Prencha o campo de Email"); 
    }else if(!password){
      Alert.alert("Atenção", "Prencha o campo de Senha");
    }else{
      
      //
    }
  }

  const handleGoToLogon = () => {
    navigation.navigate('SignUp');
  }

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Animated.Image
          //source={require('../../assets/logo.png')}
          style={{width: logo.x, height: logo.y}}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          keyboardType='email-address' 
          autoCapitalize='none'
          value={email}
          style={styles.inputText}
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          mode="outlined"
          label="Senha"
          value={password}
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={password => setPassword(password)}
        />
        <Button 
          mode="contained" 
          dark={true}
          style={styles.button} 
          onPress={()=>handleLogin(email, password)}
        >
          Entrar
        </Button>

        <Text style={styles.textRegister} onPress={()=>handleGoToLogon()}>
          Não tem uma conta? <Text style={{fontWeight: 'bold'}}> Clique aqui </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer:{
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,  
  },
  formContainer:{
    flex: 1,
    paddingBottom: 200,
  },
  inputText:{
    marginBottom: 10,
  },
  button:{
    marginTop: 15,
    marginBottom: 10,
    justifyContent: 'center',
    height: 50,
  },
  textRegister: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#ED6C30',
    textAlign: 'center',
  },
  
});

export default Login;