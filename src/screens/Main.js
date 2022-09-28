import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TodoItem from "../components/TodoItem";
import FirebaseServices from "../services/FirebaseServices";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Main({ db }) {
  const [addTodoText, setAddTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);

  const todosRef = collection(db, "todos");

  useEffect(function () {
    onSnapshot(
      query(todosRef, orderBy("createAt", "desc")),
      (querySnapshot) => {
        const newTodos = [];
        querySnapshot.forEach((doc) => {
          const todo = doc.data();
          todo.id = doc.id;
          newTodos.push(todo);
        });
        setTodoList(newTodos);
      }
    );
  }, []);

  function onChangeAddTodoText(text) {
    setAddTodoText(text);
  }

  async function onPressAdd() {
    await FirebaseServices.addTodo(todosRef, addTodoText);
    setAddTodoText("");
  }

  function renderTodoItem({ item, index }) {
    return <TodoItem item={item} key={index} todosRef={todosRef} />;
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={"handled"}
      style={styles.contain}
      enableOnAndroid={true}
    >
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
        <View style={styles.list}>
          {todoList.map((item, index) => renderTodoItem({ item, index }))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  contain: {},
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
