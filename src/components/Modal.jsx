import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Folder as FolderIcon, Save as SaveIcon } from "@mui/icons-material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { createFolder } from "../firebase/folderName.service";
import { useStore } from "../hooks/context";

export default function FormDialog({ open, setOpen }) {
  const [value, setValue] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const isDesktopView = useMediaQuery("(min-width:600px)");
  const {
    updateStateMethods: { setNewFolder },
  } = useStore();

  const validationSchema = Yup.object().shape({
    folderName: Yup.string().required("Foldername is required"),
    date: Yup.string().nullable().required("Date is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const newFolder = await createFolder(data);
      const foldersData = { ...data, id: newFolder.id };
      setNewFolder(foldersData);
      setLoading(false);
      setOpen(false);
      reset({
        folderName: "",
        date: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        maxWidth={isDesktopView ? "sm" : "xl"}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogContent>
          <Grid
            container
            alignItems={"center"}
            style={{ marginBottom: "20px" }}
          >
            <FolderIcon style={{ marginRight: "7px" }} />
            <DialogContentText>Create new folder</DialogContentText>
          </Grid>
          <Grid container flexDirection={"column"} gap={"10px"}>
            <Grid item>
              <TextField
                placeholder="Folder Name"
                autoFocus
                focused
                margin="dense"
                name="folderName"
                fullWidth
                variant="outlined"
                size="small"
                error={errors.folderName ? true : false}
                helperText={errors.folderName?.message}
                {...register("folderName")}
              />
              <Grid item>
                {isDesktopView ? (
                  <TextField
                    margin="dense"
                    name="date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={errors.date ? true : false}
                    {...register("date")}
                    helperText={errors.date?.message}
                  />
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Set Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          name="date"
                          fullWidth
                          style={{ marginTop: "5px" }}
                          size="small"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            size="small"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
