import React, {useState, useEffect} from 'react';
import { StyleSheet, 
          View, 
          Text, 
          Animated, 
          Keyboard,
          ScrollView, 
          Alert 
        } from 'react-native';

import { TextInput, Button } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown-v2';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {setAsyncStorage, keys} from '../asyncStorage/index';
import api from '../services/api';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password_confirmation, setPasswordConfirmation] = React.useState('');
  const [name, setName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [birth_date, setBirthDate] = React.useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  let genderList = [{
    label: 'Masculino',
    value: 'masculino'
    }, {
    label: 'Feminino',
    value: 'feminino'
    }
  ]

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

  const signUpRequest = async (name, birth_date, gender, email, password, password_confirmation) =>{
    //
    const response = await api.post('/users', {name, birth_date, gender, email, password, password_confirmation});
    console.log(response.data);
    handleGoToVerify();
  };

  const CreateUser = async (name, email, uid) =>{
    //
  };

  const handleLogOn = async (name, email, password) => {
    //alert(gender);

  }

  const handleGoToVerify = () => {
    navigation.navigate('VerifyUser');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.Image
          //source={require('../../assets/logo.png')}
          style={{width: logo.x, height: logo.y}}
        />
      </View>

      <ScrollView style={styles.formContainer}>
        <TextInput
          //mode="outlined"
          label="Nome"
          value={name}
          style={styles.inputText}
          onChangeText={name => setName(name)}
        />

        <Dropdown
          label='Gênero'
          useNativeDriver={false}
          data={genderList}
          onChangeText={(value,index,data)=>setGender(value)}

          baseColor='#b8b8b8' itemColor='grey' selectedItemColor='#40C0E7'
          //containerStyle={{borderWidth:1, borderColor:'lightgrey', borderRadius:5, height: 65}}
          dropdownOffset={{top:100}}
        />

        <TextInput
          //mode="outlined"
          label="Data de Nascimento"
          value={birth_date}
          style={styles.inputText}
          onChangeText={()=>{}}
          onFocus={()=>{setDatePickerVisibility(true)}}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={date=>{
            setDatePickerVisibility(false);
            setBirthDate(date.toISOString().slice(0, -14));
          }}
          onCancel={()=>{setDatePickerVisibility(false)}}
        />


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
          label="Senha"
          value={password}
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={password => setPassword(password)}
        />
        <TextInput
          //mode="outlined"
          label="Repita sua Senha"
          value={password_confirmation}
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={password => setPasswordConfirmation(password)}
        />
        <Button 
          mode="contained" 
          dark={true}
          style={styles.button}
          onPress={()=>signUpRequest(name, birth_date, gender, email, password, password_confirmation)} 
        >
          Criar Conta
        </Button>

        <Text style={styles.textVerify} onPress={()=>handleGoToVerify()}>
          Já se cadastrou? <Text style={{fontWeight: 'bold'}}> Verifique sua conta aqui </Text>
        </Text>
      </ScrollView>
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
    //flex: 1.5,
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
  pickerView:{
    height: 60,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    borderRadius: 5
  },
  picker:{
    height: 50, 
    width: '100%',
    color: '#000',
  },
  textVerify: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#ED6C30',
    textAlign: 'center',
  },
  
});

export default SignUp;