import { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";
import stateMethods from "./updateStateMethods";

const initialState = {
  snackbar: {
    severity: "success",
    message: "",
    open: false,
  },
  folders: [],
  buffering: false,
  selectedFolder: [],
  todo: [],
  fetchingFolder: true,
  fetchingTodo: false,
  bufferingTodo: false,
};

export const StoreContext = createContext();

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateStateMethods = stateMethods(dispatch);

  return (
    <StoreContext.Provider value={{ state, updateStateMethods }}>
      {children}
    </StoreContext.Provider>
  );
}
