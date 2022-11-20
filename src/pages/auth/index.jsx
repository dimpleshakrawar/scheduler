import { useState } from 'react';
import {
  Box,
  Grid,
  Backdrop
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { LeftSide, Logo, LogoHolder, SubHeading } from "./style";
import useMediaQuery from "@mui/material/useMediaQuery";
import RegisterForm from './register';
import LoginForm from './login';

export default function Signup() {
  const [ loading, setLoading ] = useState(false);
  const [ isSignupForm, setIsSignupForm ] = useState(true);

  const isDesktopView = useMediaQuery("(min-width:600px)");

  return (
    <Box height={"100%"}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid
        container
        height={"100%"}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {isDesktopView && (
          <Grid item md={6} xs={12} height={"100%"}>
            <LeftSide bgimage="signup_icon.jpg" />
          </Grid>
        )}
        <Grid item md={6} xs={12}>
          <Box p={{ md: 8, xs: 1 }}>
            <LogoHolder>
              <Logo alt="logo" src="logo.svg" />
              <h2 style={{marginBottom: 0}}>Hi, Welcome Back!</h2>
              <SubHeading>Please signup to continue using app</SubHeading>
            </LogoHolder>
            {!isDesktopView && (
              <LeftSide height='200px' bgimage="signup_icon.jpg" />
            )}
            {isSignupForm ? (
              <RegisterForm setLoading={setLoading} setIsSignupForm={setIsSignupForm} /> 
            ) : (
              <LoginForm setLoading={setLoading} setIsSignupForm={setIsSignupForm} /> 
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
