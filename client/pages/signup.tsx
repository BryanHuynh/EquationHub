import {
  Button,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import react from "react";
import GoogleIcon from "@mui/icons-material/Google";

export default function Signup() {
  const router = useRouter();

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
            Sign Up
          </Typography>
          <Box component="form" noValidate>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password confirmation"
              label="Password Confirmation"
              type="password confirmation"
              id="password-confirmation"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<GoogleIcon />}
          >
            Sign Up with Google
          </Button>
          <Button
            variant="text"
            color="inherit"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              router.push("/login");
            }}
          >
            already have an account? Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
