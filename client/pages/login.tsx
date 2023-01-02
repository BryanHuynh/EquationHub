/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import react from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleAuthProvider } from "@/lib/firebase";

export default function Login() {
  const router = useRouter();

  function SignInButton() {
    const signInWithGoogle = async () => {
      await auth.signInWithPopup(googleAuthProvider);
    };
    return (
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="inherit"
        sx={{ mt: 3, mb: 2 }}
        startIcon={<GoogleIcon />}
        onClick={(e) => {
          e.preventDefault();
          signInWithGoogle().then(() => {
            router.push("/dashboard");
          });
        }}
      >
        Sign in with Google
      </Button>
    );
  }

  function SignInForm() {
    return (
      <react.Fragment>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </react.Fragment>
    );
  }

  function SwapToSignUpButton() {
    return (
      <Button
        variant="text"
        color="inherit"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {
          router.push("/signup");
        }}
      >
        Don't have an account? Sign up
      </Button>
    );
  }

  return (
    <Grid container component="main" my={6} justifyContent="center">
      <CssBaseline />
      <Grid item component={Paper} elevation={3} xs={4} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate>
            <Divider />
            <SignInForm />
            <SignInButton />
          </Box>
          <SwapToSignUpButton />
        </Box>
      </Grid>
    </Grid>
  );
}
