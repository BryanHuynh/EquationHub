import React from "react";

import IVariable from "@/interfaces/IVariables";
import IEquation from "@/interfaces/IEquation";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import TextField from "@mui/material/TextField";
const nerdamer = require("nerdamer");
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useMutation } from "@apollo/client";
import { DELETE_EQUATION } from "@/Graphql/Mutations";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Stack,
  Tooltip,
} from "@mui/material";
import { ICalculation } from "@/interfaces/ICalculation";

require("nerdamer/Algebra");
require("nerdamer/Calculus");
require("nerdamer/Solve");
require("nerdamer/Extra");

interface IProps {
  Equation: IEquation;
  appendCalculationToLog: (calculation: ICalculation) => void;
}

const EquationForm = ({ Equation, appendCalculationToLog }: IProps) => {
  const config = {
    loader: { load: ["input/asciimath"] },
    asciimath: {
      displaystyle: true,
      delimiters: [
        ["$", "$"],
        ["`", "`"],
      ],
    },
  };

  const [deleteEquation] = useMutation(DELETE_EQUATION);

  const variables = Equation.variables;
  const [assignedVariables, setAssignedVariables] = React.useState<{
    [id: string]: string;
  }>({});
  const formula = Equation.formula;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const variableForm = variables.map((variable: IVariable) => {
    return (
      <Grid item xs={12} key={variable.name + "_inputContainer"}>
        <TextField
          key={variable.name + "_inputfield"}
          id="outlined-basic"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{variable.name}</InputAdornment>
            ),
            endAdornment: (() => {
              if (variable.description == "" || variable.description == null)
                return null;
              return (
                <InputAdornment position="end">
                  <Tooltip title={variable.description}>
                    <InfoOutlinedIcon />
                  </Tooltip>
                </InputAdornment>
              );
            })(),
          }}
          onChange={(e) => {
            try {
              const value = nerdamer(e.target.value);
              setAssignedVariables((prevState) => ({
                ...prevState,
                [variable.name]: e.target.value,
              }));
            } catch (e) {}
          }}
        />
      </Grid>
    );
  });

  const calculate = () => {
    var expression = nerdamer(formula);
    try {
      expression = expression.evaluate(Object.assign({}, assignedVariables));
    } catch (e) {
      console.log(e);
    }
    // find the missing variables
    var missingVariables: string[] = [];
    variables.forEach((variable) => {
      if (!assignedVariables[variable.name]) {
        missingVariables.push(variable.name);
      }
    });
    let missingVariableAssignments: { [id: string]: string } = {};
    missingVariables.forEach((variable: string, index: number) => {
      var sol = expression.solveFor(variable);
      try {
        sol = nerdamer(sol).evaluate();
      } catch {}

      missingVariableAssignments[variable] = sol.toString();
    });

    // append calculation to log
    const calculation: ICalculation = {
      id: 1,
      formula: formula,
      variables: Object.assign(
        {},
        assignedVariables,
        missingVariableAssignments
      ),
    };
    appendCalculationToLog(calculation);
    console.log(assignedVariables);
  };

  return (
    <Card variant="elevation" elevation={5}>
      <CardContent>
        <Stack
          spacing={2}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Grid container>
            <Grid item xs={12}>
              <MathJaxContext config={config}>
                <MathJax>
                  <p style={{ textAlign: "center" }}>`{formula}`</p>
                </MathJax>
              </MathJaxContext>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0.5}
            alignContent="center"
            direction="column-reverse"
          >
            {variableForm}
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  calculate();
                }}
              >
                Calculate
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button size="small" variant="contained" onClick={() => {}}>
                Clear
              </Button>
            </Grid>
            {MoreOptionsButton()}
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );

  function MoreOptionsButton() {
    return (
      <Grid item xs={2}>
        <IconButton
          id="basic-button"
          aria-controls={menuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : undefined}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              console.log("dialog open");
              setDeleteDialogOpen(true);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Delete</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Edit</Typography>
          </MenuItem>
        </Menu>
        <DeleteDialog />
      </Grid>
    );
  }

  function DeleteDialog() {
    return (
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this equation?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <MathJaxContext config={config}>
              <MathJax>
                <p style={{ textAlign: "center" }}>`{formula}`</p>
              </MathJax>
            </MathJaxContext>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              deleteEquation({
                variables: {
                  id: Equation.id,
                },
              }).then(() => {
                // reload page
                window.location.reload();
              });
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default EquationForm;
