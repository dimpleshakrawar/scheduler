import { Routes, Route } from "react-router-dom";
import {PrivateRoute, PublicRoute} from './routes';
import { Snackbar, Alert } from '@mui/material';
import Home from "./pages/home";
import Auth from "./pages/auth";
import { useStore } from './hooks/context';

function App() {
  const { state: { snackbar }, updateStateMethods: {setSnackbar} } = useStore();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({
      open: false,
      message: "",
      severity: "success",
    });
  };
  return (
    <div className="App">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          variant="standard"
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute><Home /></PrivateRoute>}
        />
        <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
      </Routes>
    </div>
  );
}

export default App;
