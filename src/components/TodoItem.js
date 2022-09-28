import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import FirebaseServices from "../services/FirebaseServices";

export const TodoItem = ({ item }) => {
  const [todoText, setTodoText] = useState(item.text);
  const [isEditable, setIsEditable] = useState(false);

  const onPressEdit = () => {
    setIsEditable(true);
  };

  const onPressSave = async () => {
    await FirebaseServices.updateTodo(item.id, todoText);
    setIsEditable(false);
  };

  const onPressCancel = () => {
    setIsEditable(false);
  };

  const onPressRemove = async () => {
    await FirebaseServices.removeTodo(item.id);
  };

  const onChangeTodoText = (text) => {
    setTodoText(text);
  };

  return (
    <View style={styles.itemContainer}>
      {isEditable ? (
        <TextInput
          style={styles.input}
          value={todoText}
          onChangeText={onChangeTodoText}
        />
      ) : (
        <Text style={styles.text}>{item.text}</Text>
      )}
      <View style={styles.buttonContainer}>
        {!isEditable ? (
          <>
            <TouchableOpacity style={styles.button} onPress={onPressEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressRemove}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={onPressSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  itemContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
