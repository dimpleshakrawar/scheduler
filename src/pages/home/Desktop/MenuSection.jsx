import { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  ListItemButton,
  ListItemIcon,
  Typography,
  Fab,
  Box,
  CircularProgress,
} from "@mui/material";
import { ListView } from "./style";
import {
  Add as AddIcon,
  Folder as FolderIcon,
  Delete as DeleteIcon,
  CreateNewFolder as CreateNewFolderIcon,
} from "@mui/icons-material";
import { useStore } from "../../../hooks/context";
import { CardLeft, HeaderLeft, AddBtnContainer } from "./style";
import {
  deleteFolderApi,
  getTodoFirebase,
} from "../../../firebase/folderName.service";

export default function MenuSection({ onChange }) {
  const [deletefolder, setDeleteFolder] = useState("");
  const {
    state: { folders, buffering, fetchingFolder, selectedFolder },
    updateStateMethods: {
      deleteFolder,
      setBuffering,
      setSelectedFolder,
      setFetchingData,
      setTodo,
    },
  } = useStore();

  const openModal = () => {
    onChange(true);
  };

  const deleteHandler = async (folderId) => {
    setDeleteFolder(folderId);
    setBuffering(true);
    await deleteFolderApi(folderId);
    deleteFolder(folderId);
    setBuffering(false);
    if (folderId === selectedFolder?.id && folders[1])
      setSelectedFolder(folders[1]);
    const todoData = await getTodoFirebase(folders[1].id);
    console.log(todoData);
  };

  const folderHandler = async (data) => {
    try {
      setFetchingData(true);
      setSelectedFolder(data);
      const todoData = await getTodoFirebase(data.id);
      setTodo(todoData);
      setFetchingData(false);
    } catch (err) {
      setFetchingData(false);
    }
  };

  return (
    <CardLeft sx={{ position: "relative" }}>
      <HeaderLeft>
        <Typography variant="h6" color="inherit" component="div">
          Folders
        </Typography>
      </HeaderLeft>
      {!folders.length && !fetchingFolder ? (
        <Box>
          <CreateNewFolderIcon
            color="disabled"
            sx={{
              fontSize: 90,
              position: "absolute",
              bottom: "50%",
              right: "40%",
            }}
          />
        </Box>
      ) : (
        <ListView
          style={{
            backgroundColor: "rgb(30,81,150)",
          }}
        >
          {fetchingFolder ? (
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                bottom: "50%",
                right: "50%",
              }}
            >
              <CircularProgress style={{ color: "white" }} />
            </Box>
          ) : (
            <>
              {folders?.map((data) => (
                <ListItem
                  key={data.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => deleteHandler(data.id)}
                    >
                      {buffering && data.id === deletefolder ? (
                        <Box sx={{ "& > button": { m: 1 } }}>
                          <CircularProgress
                            style={{ color: "white" }}
                            size={25}
                          />
                        </Box>
                      ) : (
                        <DeleteIcon style={{ color: "white" }} size={20} />
                      )}
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      "&:hover, &.Mui-focusVisible": {
                        backgroundColor: "rgb(23,69,132)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "rgb(23,69,132)",
                      },
                      margin: "1px 8px",
                    }}
                    selected={selectedFolder.id === data?.id}
                    role={undefined}
                    dense
                    onClick={() => folderHandler(data)}
                  >
                    <ListItemIcon>
                      <ListItemAvatar fontSize="small">
                        <Avatar>
                          <FolderIcon
                            fontSize="small"
                            style={{ color: "steelblue" }}
                          />
                        </Avatar>
                      </ListItemAvatar>
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: "14px" }}
                      primary={data.folderName}
                      secondary={data.date}
                      secondaryTypographyProps={{ color: "silver" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </ListView>
      )}

      <AddBtnContainer>
        <Fab
          variant="extended"
          size="medium"
          style={{ fontWeight: "bold" }}
          aria-label="add"
          onClick={openModal}
          sx={{
            "&:hover, &.Mui-focusVisible": {
              backgroundColor: "rgb(23,69,132)",
            },
          }}
        >
          <AddIcon sx={{ mr: 1 }} color="primary" />
          ADD
        </Fab>
      </AddBtnContainer>
    </CardLeft>
  );
}
