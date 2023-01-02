import Head from "next/head";
// import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Box } from "@mui/system";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Router from "next/router";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { auth } from "@/lib/firebase";

export default function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ mx: 20 }}>
          {TitleCard()}
          {!user && (
            <>
              {RedirectToLoginPageButton()}
              {ReDirectToSignUpPageButton()}
            </>
          )}
          {user && WelcomeUserName(user)}
          {user && LogoutButton()}
        </Toolbar>
      </AppBar>
    </Box>
  );

  function ReDirectToSignUpPageButton() {
    return (
      <Button
        color="inherit"
        onClick={(e) => {
          // e.preventDefault();
          Router.push("/signup");
        }}
      >
        Sign up
      </Button>
    );
  }

  function RedirectToLoginPageButton() {
    return (
      <Button
        color="inherit"
        onClick={(e) => {
          // e.preventDefault();
          Router.push("/login");
        }}
      >
        Login
      </Button>
    );
  }

  function TitleCard() {
    return (
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
        onClick={(e) => {
          // e.preventDefault();
          Router.push("/");
        }}
      >
        Equation Hub
      </Typography>
    );
  }

  function LogoutButton() {
    return (
      <Button
        color="inherit"
        onClick={(e) => {
          // e.preventDefault();
          auth.signOut().then(() => {
            Router.push("/");
          });
        }}
      >
        Logout
      </Button>
    );
  }

  function WelcomeUserName(user) {
    return (
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Welcome {user.displayName}
      </Typography>
    );
  }
}
