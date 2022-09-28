import firebase from "firebase/compat/app";

const addTodo = async (text) => {
  const todoData = {
    text: text,
    createAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  try {
    await firebase.firestore().collection("todos").add(todoData);
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (id, text) => {
  try {
    await firebase
      .firestore()
      .collection("todos")
      .doc(id)
      .update({ text: text });
  } catch (error) {
    console.log(error);
  }
};

const removeTodo = async (id) => {
  try {
    await firebase.firestore().collection("todos").doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};

const FirebaseService = { addTodo, updateTodo, removeTodo };

export default FirebaseService;
