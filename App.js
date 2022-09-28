import { initializeApp } from "firebase/app";
import { PROJECT_ID, APP_ID } from "@env";

import Main from "./src/screens/Main";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: PROJECT_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function App() {
  return <Main db={db} />;
}
