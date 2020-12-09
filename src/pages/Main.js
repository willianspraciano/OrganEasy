import React, {useState,useCallback, useEffect} from 'react';
import {Text, View, StyleSheet,SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal} from 'react-native';
import { TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import{Ionicons} from '@expo/vector-icons';
import TaskList from  '../components/TaskList';
import * as Animatable from 'react-native-animatable'; 

const AnimateBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function Main() {

  const [task, setTask] = useState([ ]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  //Buscando todas as tarefas ao iniciar o App
  useEffect(()=> {
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }
    loadTasks();
  }, []);

  //Salvando Caso Tenha alguma tarefa alterada
  useEffect(()=> {
    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }
    saveTasks();
  },[task]);


  function handleAdd(){
    if(input === '')return;

    const data ={
      key:input,
      task:input
    };

    setTask([...task,data]);
    setOpen(false);
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key)
    setTask(find);
  })

  return(
    

    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content"/>
      <View style={styles.content}>
      <Text style={styles.title}> Minhas tarefas </Text>  
      </View>

      <FlatList 
      marginHorizontal={15}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={(item) => String(item.key)}
      renderItem={({item}) => <TaskList data={item} handleDelete={handleDelete}/>}
      />
      
      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={{marginLeft:5,marginRight:5}} name="md-arrow-back" size={40} color="#000"/>
            </TouchableOpacity>
            <Text style={styles.modalTitle}> Nova Tarefa</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="O que precisa fazer hoje?"
              style={styles.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
              />
            <TouchableOpacity style={styles.handleAdd}  onPress={handleAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>

          </Animatable.View>
          
        </SafeAreaView>
      </Modal>
      <AnimateBtn 
      style={styles.fab}
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
      onPress={()=> setOpen(true)}
      >
        <Ionicons   name="ios-add" size={35} color="#FFF"/>     
      </AnimateBtn>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
  },
  title:{
    marginTop:10,
    paddingBottom:10,
    fontSize:25,
    textAlign:'center',
    color:'#000'
  },
  fab:{
    position:"absolute",
    width:60,
    height:60,
    backgroundColor:"#ED6C30",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:30,
    right:25,
    bottom:25,
    elevation:2,
    zIndex:9,
    shadowColor:"#000",
    shadowOpacity:0.2,
    shadowOffset:{
      width:1,
      height:3,
    }
  },
  modal:{
    flex:1,
    backgroundColor:'#fff'
  },
  modalHeader:{
    marginLeft:10,
    marginTop:20,
    flexDirection:'row',
    alignItems:'center'
  },
  modalTitle:{
    marginLeft:15,
    fontSize:23,
    color:'#000'
  },
  modalBody:{
    marginTop:15,
  },
  input:{
    fontSize:15,
    marginLeft:10,
    marginRight:10,
    marginTop:30,
    backgroundColor:'#F2F3F4',
    padding:9,
    height:85,
    textAlignVertical:'top',
    color:'#000',
    borderRadius:5,
  },
  handleAdd:{
   backgroundColor:'#40C0E7',
   marginTop: 10,
   alignItems:'center',
   justifyContent:'center',
   marginLeft:10,
   marginRight:10,
   height:40,
   borderRadius:5
  },
  handleAddText:{
    fontSize:23,
  }
});


/* const Main = ({navigation}) => {

  /** Firebase logout 
  const LogOutUser = async () => {
    //
  };

  //** handle logout 
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

export default Main;*/