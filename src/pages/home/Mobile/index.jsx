import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Box,
  TextField,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  ListItemButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function Mobile({ openSidebar, toggleDrawer }) {
  const [checked, setChecked] = useState([null]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box>
      <Sidebar toggleDrawer={toggleDrawer} openSidebar={openSidebar} />
      <Grid
        position={"sticky"}
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        style={{ marginTop: "10px", padding: "0 10px" }}
      >
        <Grid item>
          <TextField size="small" fullWidth label="Todo" type="text" />
        </Grid>
        <Grid item>
          <Button variant="contained" size="small" style={{ height: "38px" }}>
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <List
          dense
          sx={{
            height: "73vh",
            bgcolor: "background.paper",
            overflowY: "auto",
          }}
        >
          {[...new Array(20)].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <Checkbox
                    size="small"
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Box>
  );
}
