import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase/compat/app";

import { TodoItem } from "../components";
import FirebaseServices from "../services/FirebaseServices";

export const Main = () => {
  const [addTodoText, setAddTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);

  const todoRef = firebase.firestore().collection("todos");

  useEffect(() => {
    todoRef.onSnapshot(
      (querySnapshot) => {
        const newTodos = [];
        querySnapshot.forEach((doc) => {
          const todo = doc.data();
          todo.id = doc.id;
          newTodos.push(todo);
        });
        setTodoList(newTodos);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const onChangeAddTodoText = (text) => {
    setAddTodoText(text);
  };

  const onPressAdd = async () => {
    await FirebaseServices.addTodo(addTodoText);
  };

  const renderTodoItem = ({ item, index }) => {
    const onPressEdit = () => {};
    const onPressRemove = async () => {
      try {
        await todoRef.doc(item.id).delete();
      } catch (error) {
        console.log(error);
      }
    };
    return <TodoItem item={item} index={index} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAddTodoText}
          value={addTodoText}
        />
        <TouchableOpacity style={styles.button} onPress={onPressAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.todoHeader}>To do List</Text>
      <FlatList
        style={styles.list}
        renderItem={renderTodoItem}
        data={todoList}
        scrollEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 100,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
  },
  todoHeader: {
    fontSize: 32,
    marginVertical: 20,
  },
  list: {
    width: "100%",
  },
});
