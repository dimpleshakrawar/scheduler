import { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  ListItemButton,
  Input,
  Box,
  CircularProgress,
  InputBase,
} from "@mui/material";
import {
  updateFolderName,
  addTodoFirebase,
  getTodoFirebase,
  deleteTodoApi,
  checkedTodoFirebase,
  unCheckedTodoFirebase,
} from "../../../firebase/folderName.service";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  NoteAdd as NoteAddIcon,
} from "@mui/icons-material";
import { CardRight, HeaderRight } from "./style";
import { useStore } from "../../../hooks/context";

export default function ListSection() {
  const [edit, setEdit] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState("");
  const [localTodo, setLocalTodo] = useState("");
  const [updateName, setUpdateName] = useState();
  const {
    state: { todo, selectedFolder, folders, fetchingTodo, bufferingTodo },
    updateStateMethods: {
      setUpdatedFolder,
      setTodo,
      setFetchingTodo,
      deleteTodo,
      setBufferingTodo,
    },
  } = useStore();

  const submitTodo = async (localTodo, folderId) => {
    setLocalTodo("");
    setFetchingTodo(true);
    try {
      const newTodo = await addTodoFirebase(localTodo, folderId);
      const todosData = { localTodo, id: newTodo.id };
      setTodo(todosData);
      const todoData = await getTodoFirebase(folderId);
      setTodo(todoData);
      setFetchingTodo(false);
    } catch (err) {
      console.log(err, "reject");
    }
  };

  const checkboxHandler = async (todo, folderId) => {
    try {
      if (todo.status !== "completed") {
        checkedTodoFirebase(todo.id);
        const todoData = await getTodoFirebase(folderId);
        setTodo(todoData);
      } else {
        unCheckedTodoFirebase(todo.id);
        const todoData = await getTodoFirebase(folderId);
        setTodo(todoData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodoHandler = async (todoId) => {
    setDeleteTodoId(todoId);
    setBufferingTodo(true);
    await deleteTodoApi(todoId);
    deleteTodo(todoId);
    setBufferingTodo(false);
  };

  const closeEditing = async (updateName, id) => {
    setEdit(false);
    try {
      await updateFolderName(updateName, id);
      folders.map((doc) => {
        if (doc.id === id) {
          doc.folderName = updateName;
          setUpdatedFolder(folders);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CardRight>
      <HeaderRight>
        {!edit ? (
          <Grid
            container
            justifyContent={"start"}
            style={{ paddingBottom: "8px" }}
          >
            <Typography variant="h6" color="inherit" component="div">
              {selectedFolder.folderName}
            </Typography>
            <IconButton sx={{ padding: 0 }} onClick={() => setEdit(true)}>
              <EditIcon
                sx={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  color: "white",
                }}
              />
            </IconButton>
          </Grid>
        ) : (
          <Grid container justifyContent={"start"}>
            <InputBase
              style={{ fontSize: "20px", width: "120px", color: "white" }}
              value={updateName}
              defaultValue={selectedFolder.folderName}
              onChange={(e) => setUpdateName(e.target.value)}
              onFocus={(event) => {
                event.target.select();
              }}
            />
            <IconButton
              variant="contained"
              onClick={() => closeEditing(updateName, selectedFolder.id)}
            >
              <DoneIcon
                variant="filled"
                color="primary"
                style={{ color: "white" }}
              />
            </IconButton>
          </Grid>
        )}
      </HeaderRight>

      <List
        dense
        sx={{
          bgcolor: "white",
          overflowY: "auto",
          height: "508px",
          borderRadius: "10px",
        }}
      >
        <ListItem
          style={{
            position: "sticky",
            top: "-8px",
            marginTop: "-8px",
            background: "white",
            zIndex: 1,
          }}
        >
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-evenly"}
            gap={2}
            sx={{ mt: "7px" }}
          >
            <Grid item xs>
              <TextField
                size="small"
                fullWidth
                label="Todo"
                type="text"
                value={localTodo}
                onChange={(e) => setLocalTodo(e.target.value)}
              />
            </Grid>
            <Grid item>
              {fetchingTodo ? (
                <Box sx={{ "& > button": { m: 1 } }}>
                  <CircularProgress size={25} />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => submitTodo(localTodo, selectedFolder.id)}
                >
                  <AddIcon />
                </Button>
              )}
            </Grid>
          </Grid>
        </ListItem>
        {todo?.length ? (
          <>
            {todo?.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.id}`;
              return (
                <ListItem
                  key={value.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      inputProps={{ "aria-labelledby": labelId }}
                      checked={value.status === "completed"}
                      onClick={() => checkboxHandler(value, selectedFolder.id)}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      "&:hover, &.Mui-focusVisible": {
                        backgroundColor: "rgb(203,239,253)",
                      },
                    }}
                    disabled={value.status === "completed"}
                  >
                    <ListItemText
                      id={labelId}
                      primary={value.todo}
                      primaryTypographyProps={{ fontSize: "16px" }}
                      style={{
                        color: "black",

                        textDecoration:
                          value.status === "completed" && "line-through",
                      }}
                    />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteTodoHandler(value.id)}
                    >
                      {bufferingTodo && value.id === deleteTodoId ? (
                        <Box sx={{ "& > button": { m: 1 } }}>
                          <CircularProgress size={25} />
                        </Box>
                      ) : (
                        <DeleteIcon size={20} />
                      )}
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </>
        ) : (
          <Box>
            <NoteAddIcon
              color="disabled"
              sx={{
                fontSize: 110,
                position: "absolute",
                bottom: "50%",
                right: "40%",
              }}
            />
          </Box>
        )}
      </List>
    </CardRight>
  );
}
