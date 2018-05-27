import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions,Platform,ScrollView } from 'react-native';
import Todo from './Todo.js';
import {AppLoading} from 'expo';
import uuidv1 from 'uuid/v1';

const {height,width} = Dimensions.get('window')

export default class App extends React.Component {
  state ={
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  }
  render() {
    const { newToDo, loadedToDos,toDos } = this.state;
    if(!loadedToDos) {
      return(
        <AppLoading />
        )
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kaw ai To Do</Text>
        <View style={styles.card}>
            <TextInput style={styles.input} 
              placeholder={"New To Do"} 
              value={newToDo} 
              onChangeText={this._controllNewTodo} 
              placeholderTextColor={"#999"}
              returnKeyType={"done"}
              autoCorrect={false}
              onSubmitEditing={this._addToDo}
            />
            <ScrollView contentContainerStyle={styles.toDos}>
              {Object.values(toDos).map(toDo => <Todo key={toDo.id} {...toDo} />)}
            </ScrollView>
        </View>

      </View>
    );
  
  }

  _controllNewTodo = text => {
    this.setState({
      newToDo: text
    })
  }

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    })
  }

  _addToDo = () => {
    const {newToDo} = this.state;
    if(newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return {...newState}
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: '200',
    marginBottom: 30
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: -1
        }
      },
      android:{
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor:"#bbb",
    borderBottomWidth: 1,
    fontSize:25
  },
  toDos: {
    alignItems: "center"
  }
});
