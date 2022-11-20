import { db } from ".";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  get,
  setDoc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "user");

// export const addUser = (newUser) => {
//   return addDoc(userCollectionRef, newUser);
// };

export const getAllUser = () => {
  return getDocs(userCollectionRef);
};

export const getUserById = (id) => {
  const userDoc = doc(db, "user", id);
  return getDoc(userDoc);
};

export const addUser = (email, data) => {
  const userDoc = doc(userCollectionRef, email);
  return setDoc(userDoc, data);
};
