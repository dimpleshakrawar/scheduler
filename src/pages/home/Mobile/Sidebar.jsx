import { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Fab,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import Modal from "./../../../components/Modal";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Add as AddIcon,
} from "@mui/icons-material";

export default function Sidebar({ openSidebar, toggleDrawer }) {
  const [modal, setModal] = useState(false);
  const list = () => (
    <Box
      sx={{ width: 250, height: "100vh" }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding style={{ gap: "20px" }}>
          <IconButton onClick={toggleDrawer(false)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <ListItemText primary="Folder" />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  const openModal = () => {
    setModal(true);
  };

  return (
    <div>
      <>
        <SwipeableDrawer
          anchor="left"
          open={openSidebar}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={"Todo 1"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            style={{ position: "absolute", bottom: "16px", right: "16px" }}
          >
            <AddIcon onClick={openModal} />
            <Modal open={modal} setOpen={setModal} />
          </Fab>
        </SwipeableDrawer>
      </>
    </div>
  );
}
