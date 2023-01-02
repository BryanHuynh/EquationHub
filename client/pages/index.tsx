import Head from "next/head";
// import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Box } from "@mui/system";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Router from "next/router";
// import wave from "../public/wave.svg";
import Image from "next/image";
import wave from "../public/wave.svg";
import { useContext } from "react";
import { UserContext } from "@/lib/context";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // if user is logged in, redirect to dashboard
  const { user } = useContext(UserContext);
  if (user) {
    Router.push("/dashboard");
  }

  function Hero() {
    return (
      <Box
        style={{
          position: "relative",
          width: "100vw",
          height: "30rem",
        }}
      >
        <Image src={wave} layout="fill" alt="wave" />
      </Box>
    );
  }
  return (
    <>
      <Head>
        <title>Equation Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Hero />
      </main>
    </>
  );
}
