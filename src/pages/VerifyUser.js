import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, Animated, Keyboard, Alert } from 'react-native';
import { TextInput, Button} from 'react-native-paper';
import {setAsyncStorage, keys, getAsyncStorage} from '../asyncStorage/index';
import api from '../services/api';


const VerifyUser = ({ navigation }) => {

  const [email, setEmail] = React.useState('');
  const [verification_code, setVerificationCode] = React.useState('');

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

  const verifyRequest = async (email, verification_code) =>{
    //const response = 
    await api.post('/verify_user', {email, verification_code})
      .then((response)=>{
         console.log("Resposta: " + response.data);
         if(response.status === 204){
          Alert.alert(
            "Sucesso",
            "Seu email foi verificado com sucesso!",
            [
              { 
                text: "OK", 
                onPress: () => {
                  setEmail(''); 
                  setVerificationCode('');
                } }
            ],
            { cancelable: false }
          );
           navigation.replace('Login');
         }
      }).catch((error)=>{
        console.log("Resposta do Erro: "+ error.response.data);
        if(error.response.status === 400){
          setVerificationCode('');
          Alert.alert(
            "Atenção",
            "Email já verificado ou código invalido",
            [
              { 
                text: "OK", 
                onPress: () => {
                  setVerificationCode('');
                } }
            ],
            { cancelable: false }
          );
        }
      });

    //console.log(response.data);
    //handleGoToLogin();
  };

  const handleVerify = async (email, verification_code) => {
    if(!email){
      Alert.alert("Atenção", "Prencha o campo de Email"); 
    }else if(!verification_code){
      Alert.alert("Atenção", "Prencha o campo de Código de Verificação");
    }else{
      verifyRequest(email, verification_code).then((res)=>{
        console.log(res);
      });
    }
  }

  const handleGoToLogin = () => {
    navigation.navigate('Login');
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
          //mode="outlined"
          label="Email"
          keyboardType='email-address' 
          autoCapitalize='none'
          value={email}
          style={styles.inputText}
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          //mode="outlined"
          label="Codigo de Verificação"
          value={verification_code}
          style={styles.inputText}
          onChangeText={password => setVerificationCode(password)}
        />
        <Button 
          mode="contained" 
          dark={true}
          style={styles.button} 
          onPress={()=>handleVerify(email, verification_code)}
        >
          Verificar
        </Button>

        <Text style={styles.textRegister} onPress={()=>handleGoToLogin()}>
          Já tem uma conta? <Text style={{fontWeight: 'bold'}}> Entre aqui aqui </Text>
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

export default VerifyUser;