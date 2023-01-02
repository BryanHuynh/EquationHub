import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { Dispatch, SetStateAction } from "react";
import router from "next/router";

interface IProps {
  setNewEquationOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CoursesToolBar({ setNewEquationOpen }: IProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense" sx={{ mx: 20 }}>
          <Tooltip title="Return To Courses Page">
            <IconButton
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Add new Equation">
            <IconButton
              onClick={() => {
                setNewEquationOpen(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
