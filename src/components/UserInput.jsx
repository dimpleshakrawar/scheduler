import { Box } from "@mui/system";
import { TextField, Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function ({ onSubmit }) {
  const [todo, setTodo] = useState("");

  const newtodo = (e) => {
    setTodo(e.target.value);
  };

  const taskinfo = {
    todos: todo,
  };

  const submitTodo = () => {
    onSubmit(taskinfo);
  };

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        gap={1}
      >
        <Grid item xs>
          <TextField
            label="Todo..."
            id="outlined-size-small"
            size="small"
            value={todo}
            onChange={newtodo}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button
            style={{ height: "100%" }}
            variant="contained"
            onClick={submitTodo}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
