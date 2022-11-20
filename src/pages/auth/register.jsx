import {
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth, useStore } from '../../hooks/context';
import { ButtonAuthSwitch, AuthLink } from './style';

export default function Register({ setLoading, setIsSignupForm }) {
  const {signup} = useAuth();
  const { updateStateMethods: {setSnackbar} } = useStore();
  const isDesktopView = useMediaQuery("(min-width:600px)");

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
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
      await signup(data.email, data.password);
      reset({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setSnackbar({
        open: true,
        message: 'User register Successfully!',
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
        id="fullname"
        name="fullname"
        label="Full Name"
        fullWidth
        margin="dense"
        {...register("fullname")}
        error={errors.fullname ? true : false}
        size={isDesktopView ? "normal" : "small"}
        helperText={errors.fullname?.message}
      />

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
        helperText={errors.email?.message}
      />

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
        helperText={errors.password?.message}
      />

      <TextField
        required
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        fullWidth
        margin="dense"
        {...register("confirmPassword")}
        error={errors.confirmPassword ? true : false}
        size={isDesktopView ? "normal" : "small"}
        helperText={errors.confirmPassword?.message}
      />

      <ButtonAuthSwitch>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Register
        </Button>
        <Typography variant="body2" display="block" gutterBottom>
          Already have an account <span><AuthLink onClick={() => setIsSignupForm(false)}>Login</AuthLink></span>
        </Typography>
      </ButtonAuthSwitch>
    </>
  );
}
