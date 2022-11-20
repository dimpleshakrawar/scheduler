import { useState } from "react";
import { Grid } from "@mui/material";
import ListSection from "./ListSection";
import MenuSection from "./MenuSection";
import Modal from "../../../components/Modal";
import { Card } from "./style";

export default function DesktopMode() {
  const [open, setOpen] = useState(false);
  const addTodo = (state) => {
    setOpen(state);
  };

  return (
    <Card>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} md={4}>
          <MenuSection onChange={addTodo} />
        </Grid>
        <Grid item xs={0} md={8}>
          <ListSection />
        </Grid>
      </Grid>
      <Modal open={open} setOpen={setOpen} />
    </Card>
  );
}
