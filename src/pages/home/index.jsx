import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Grid,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Logout as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material";
import DeskTopView from "./Desktop";
import MobileView from "./Mobile";
import { Title } from "./style";
import { useAuth, useStore } from "../../hooks/context";
import {
  getAllFolders,
  getTodoFirebase,
} from "../../firebase/folderName.service";

export default function Home() {
  const { logout } = useAuth();
  const {
    updateStateMethods: {
      setAllFolders,
      setFetchingData,
      setSelectedFolder,
      setTodo,
    },
  } = useStore();
  const isDesktopView = useMediaQuery("(min-width:600px)");
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenSidebar(open);
  };

  const fetchData = useCallback(async () => {
    setFetchingData(true);
    try {
      const folderdata = await getAllFolders();
      setAllFolders(folderdata);
      if (folderdata.length) {
        setSelectedFolder(folderdata[0]);
        const todoData = await getTodoFirebase(folderdata[0].id);
        setTodo(todoData);
      }
      setFetchingData(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box style={{ height: "100%", backgroundColor: "rgb(203,239,253)" }}>
      <AppBar position="sticky">
        <Container disableGutters={!isDesktopView} maxWidth={isDesktopView}>
          <Toolbar variant="dense">
            <Grid container justifyContent={"space-between"}>
              {!isDesktopView && (
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Title>Scheduler</Title>
              {isDesktopView ? (
                <Button
                  edge="start"
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={logout}
                >
                  Log Out
                </Button>
              ) : (
                <IconButton size="small" color="inherit" onClick={logout}>
                  <LogoutIcon />
                </IconButton>
              )}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      {isDesktopView ? (
        <DeskTopView />
      ) : (
        <MobileView openSidebar={openSidebar} toggleDrawer={toggleDrawer} />
      )}
    </Box>
  );
}
