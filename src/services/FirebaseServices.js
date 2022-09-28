import {
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

async function addTodo(todoCollection, text) {
  const todoData = {
    text: text,
    createAt: serverTimestamp(),
  };
  try {
    await addDoc(todoCollection, todoData);
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(todoCollection, id, text) {
  try {
    await updateDoc(doc(todoCollection, id), { text });
  } catch (error) {
    console.log(error);
  }
}

async function removeTodo(todoCollection, id) {
  try {
    await deleteDoc(doc(todoCollection, id));
  } catch (error) {
    console.log(error);
  }
}

const FirebaseService = { addTodo, updateTodo, removeTodo };

export default FirebaseService;
