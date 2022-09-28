import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { PROJECT_ID, APP_ID } from "@env";

import { Main } from "./src/screens";

const firebaseConfig = {
  projectId: PROJECT_ID,
  appId: APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return <Main />;
}
