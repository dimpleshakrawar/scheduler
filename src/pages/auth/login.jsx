import {
  TextField,
  Typography,
  Button
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth, useStore } from '../../hooks/context';
import { ButtonAuthSwitch, AuthLink } from './style';

export default function Register({ setLoading, setIsSignupForm }) {
  const {login} = useAuth();
  const { updateStateMethods: {setSnackbar} } = useStore();
  const isDesktopView = useMediaQuery("(min-width:600px)");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
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
    setLoading(true)
    try {
      await login(data.email, data.password);
      reset({
        email: '',
        password: '',
      });
      setSnackbar({
        open: true,
        message: 'User log Successfully!',
        severity: 'success'
      });
    } catch(err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      })
    }
    setLoading(false);
  };

  return (
    <>
      <TextField
        required
        id="email"
        name="email"
        label="Email"
        fullWidth
        margin="dense"
        {...register("email")}
        error={errors.email ? true : false}
        size={isDesktopView ? "normal" : "small"}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors.email?.message}
      </Typography>

      <TextField
        required
        id="password"
        name="password"
        label="Password"
        type="password"
        fullWidth
        margin="dense"
        {...register("password")}
        error={errors.password ? true : false}
        size={isDesktopView ? "normal" : "small"}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors.password?.message}
      </Typography>

      <ButtonAuthSwitch>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
        <Typography variant="body2" display="block" gutterBottom>
          Don't have an account <span><AuthLink onClick={() => setIsSignupForm(true)}>Sign up</AuthLink></span>
        </Typography>
      </ButtonAuthSwitch>
    </>
  );
}
