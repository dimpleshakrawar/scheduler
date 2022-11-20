import { useContext } from "react";
import { StoreContext } from '../context/StoreContext';
import { AuthContext } from '../context/AuthContext';

export function useStore() {
  return useContext(StoreContext)
}

export function useAuth() {
  return useContext(AuthContext)
}