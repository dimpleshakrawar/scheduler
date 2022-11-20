export default function Reducer(state, { type, payload }) {
  switch (type) {
    case "SNACKBAR": {
      return {
        ...state,
        snackbar: {
          severity: payload.severity,
          message: payload.message,
          open: payload.open,
        },
      };
    }
    case "SET_FOLDERS": {
      return {
        ...state,
        folders: [...payload],
      };
    }
    case "SET_NEW_FOLDER": {
      return {
        ...state,
        folders: [payload, ...state.folders],
      };
    }
    case "DELETE_FOLDER": {
      const filteredData = state.folders.filter((doc) => doc.id !== payload);
      return {
        ...state,
        folders: filteredData,
      };
    }
    case "BUFFER": {
      return {
        ...state,
        buffering: payload,
      };
    }
    case "SELECTED_FOLDER": {
      return {
        ...state,
        selectedFolder: payload,
      };
    }
    case "FETCHING_DATA": {
      return {
        ...state,
        fetchingFolder: payload,
      };
    }
    case "SET_TODO": {
      return {
        ...state,
        todo: payload,
      };
    }
    case "UPDATE": {
      return {
        ...state,
        folder: [payload, ...state.folders],
      };
    }
    case "FETCH_TODO": {
      return {
        ...state,
        fetchingTodo: payload,
      };
    }
    case "DELETE_TODO": {
      const filteredData = state.todo.filter((doc) => doc.id !== payload);
      return {
        ...state,
        todo: filteredData,
      };
    }
    case "BUFFER_TODO": {
      return {
        ...state,
        bufferingTodo: payload,
      };
    }
    default:
      return state;
  }
}

/**
 * todo: [
 *    {id: 'jkhjkhjk', 'projectId: 'jkhkjhjk', text: 'kjhjkhjk', status: 'done', createdAt: 'date' '},
 *    {id: 'jkhjkhjk', 'projectId: 'jkhkjhjk', text: 'kjhjkhjk', status: 'done', createdAt: 'date' '},
 *    {id: 'jkhjkhjk', 'projectId: 'jkhkjhjk', text: 'kjhjkhjk', status: 'done', createdAt: 'date' '},
 *    {id: 'jkhjkhjk', 'projectId: 'jkhkjhjk', text: 'kjhjkhjk', status: 'done', createdAt: 'date' '}
 * ]
 */
