import { db } from ".";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from ".";

const folderCollectionRef = collection(db, "folder");
const todoCollectionRef = collection(db, "todos");

export const createFolder = (data) => {
  const { currentUser } = getAuth();
  return addDoc(folderCollectionRef, {
    userId: currentUser.uid,
    ...data,
    created: serverTimestamp(),
  });
};

export const getAllFolders = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { currentUser } = getAuth();
      const allFolders = [];
      const folderquery = query(
        folderCollectionRef,
        where("userId", "==", currentUser.uid),
        orderBy("created", "desc")
      );
      const folders = await getDocs(folderquery);
      folders.forEach((doc) => {
        allFolders.push({ ...doc.data(), id: doc.id });
      });
      resolve(allFolders);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteFolderApi = (folderId) => {
  return deleteDoc(doc(db, "folder", folderId));
};

export const deleteTodoApi = (todoId) => {
  return deleteDoc(doc(db, "todos", todoId));
};

export const updateFolderName = (updatedName, folderId) => {
  const userDoc = doc(db, "folder", folderId);
  return updateDoc(userDoc, {
    folderName: updatedName,
  });
};

export const addTodoFirebase = (todo, folderId) => {
  return addDoc(todoCollectionRef, {
    folderId: folderId,
    todo,
    created: serverTimestamp(),
    status: "pending",
  });
};

export const getTodoFirebase = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const alltodos = [];
      const folderquery = query(
        todoCollectionRef,
        where("folderId", "==", id),
        orderBy("created", "desc")
      );
      const todos = await getDocs(folderquery);
      todos.forEach((doc) => {
        alltodos.push({ ...doc.data(), id: doc.id });
      });
      resolve(alltodos);
    } catch (err) {
      reject(err);
    }
  });
};

export const checkedTodoFirebase = (todoId) => {
  const userTodo = doc(db, "todos", todoId);
  updateDoc(userTodo, {
    status: "completed",
  });
};

export const unCheckedTodoFirebase = (todoId) => {
  const userTodo = doc(db, "todos", todoId);
  updateDoc(userTodo, {
    status: "pending",
  });
};
