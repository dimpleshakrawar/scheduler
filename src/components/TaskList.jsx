import { Box } from "@mui/system";
import {
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@mui/material";

export default function TaskList({ onNewTask }) {
  return (
    <Box>
      {onNewTask?.map((tasks) => (
        <Grid
          container
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 auto",
          }}
        >
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                // checked={gilad}
                // onChange={handleChange}
                // name="gilad"
                />
              }
              label={tasks.todos}
            />
          </Grid>
          <Grid item xs={8} style={{ display: "contents" }}>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8} style={{ display: "contents" }}>
            <EditIcon />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
