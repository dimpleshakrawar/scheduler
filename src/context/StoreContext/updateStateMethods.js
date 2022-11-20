export default function updateStateMethods(dispatch) {
  return {
    setSnackbar(payload) {
      dispatch({ type: "SNACKBAR", payload });
    },
    setAllFolders(payload) {
      dispatch({ type: "SET_FOLDERS", payload });
    },
    setNewFolder(payload) {
      dispatch({ type: "SET_NEW_FOLDER", payload });
    },
    deleteFolder(payload) {
      dispatch({ type: "DELETE_FOLDER", payload });
    },
    setBuffering(payload) {
      dispatch({ type: "BUFFER", payload });
    },
    setSelectedFolder(payload) {
      dispatch({ type: "SELECTED_FOLDER", payload });
    },
    setFetchingData(payload) {
      dispatch({ type: "FETCHING_DATA", payload });
    },
    setTodo(payload) {
      dispatch({ type: "SET_TODO", payload });
    },
    setUpdatedFolder(payload) {
      dispatch({ type: "UPDATE", payload });
    },
    setFetchingTodo(payload) {
      dispatch({ type: "FETCH_TODO", payload });
    },
    deleteTodo(payload) {
      dispatch({ type: "DELETE_TODO", payload });
    },
    setBufferingTodo(payload) {
      dispatch({ type: "BUFFER_TODO", payload });
    },
  };
}
