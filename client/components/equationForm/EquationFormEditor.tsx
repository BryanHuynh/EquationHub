import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Button } from "@mui/material";
import IVariable from "@/interfaces/IVariables";
import IEquation from "@/interfaces/IEquation";
import nerdamer from "nerdamer";
import { useMutation } from "@apollo/client";
import { CREATE_EQUATION, CREATE_VARIABLE } from "@/Graphql/Mutations";

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

interface IProps {
  Equation?: IEquation;
  courseID: number;
}

const EquationFormEditor = ({ Equation, courseID }: IProps) => {
  const [newEquation, setNewEquation] = useState<IEquation>(
    Equation
      ? Equation
      : {
          id: 0,
          name: "",
          description: "",
          formula: "",
          variables: [],
        }
  );
  const [createEquation] = useMutation(CREATE_EQUATION);
  const [createVariable] = useMutation(CREATE_VARIABLE);

  useEffect(() => {
    let variables = [];
    if (newEquation.formula === "") {
      setNewEquation((prev) => {
        return {
          ...prev,
          variables: [],
        };
      });
      return;
    }
    try {
      variables = nerdamer(newEquation.formula).variables();
    } catch {
      return;
    }

    if (variables) {
      const res: IVariable[] = variables?.map((variable, index) => {
        return { name: variable, units: "", description: "", order: index };
      });
      setNewEquation((prev) => {
        return {
          ...prev,
          variables: res,
        };
      });
    }
  }, [newEquation.formula]);

  const DisplayVariables = (equation: IEquation) => {
    return (
      <Grid container spacing={0.5} key={"variables_container"} m={0}>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Variable Name</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Units</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="subtitle2">Description</Typography>
        </Grid>
        {equation.variables.map((variable: IVariable, index: number) => (
          <>
            <Grid item xs={2} key={`${variable.name}_name_container`}>
              <TextField
                defaultValue={variable.name}
                key={index + "_variable_name"}
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={2} key={`${variable.name}_unit_container`}>
              <TextField
                defaultValue={variable.units}
                key={index + "_variable_units"}
                fullWidth
                size="small"
                onChange={(e) => {
                  const newVariables = [...equation.variables];
                  newVariables[index].units = e.target.value;
                  setNewEquation((prev) => ({
                    ...prev,
                    variables: newVariables,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={8} key={`${variable.name}_description_container`}>
              <TextField
                defaultValue={variable.description}
                key={index + "_variable_description"}
                fullWidth
                multiline
                size="small"
                onChange={(e) => {
                  const newVariables = [...equation.variables];
                  newVariables[index].description = e.target.value;
                  setNewEquation((prev) => ({
                    ...prev,
                    variables: newVariables,
                  }));
                }}
              />
            </Grid>
          </>
        ))}
      </Grid>
    );
  };

  const EquationMetaData = (
    equation: IEquation,
    setNewEquation: React.Dispatch<React.SetStateAction<IEquation>>
  ) => {
    return (
      <Grid container spacing={1} m={0} key={"new_variable_container"}>
        <Grid item xs={12} key="meta_name_input_container">
          <TextField
            defaultValue={equation.name}
            fullWidth
            size="small"
            label="Name"
            onChange={(e) =>
              setNewEquation((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={12} key="meta_description_input_container">
          <TextField
            defaultValue={equation.description}
            fullWidth
            multiline
            label="Description"
            size="small"
            onChange={(e) =>
              setNewEquation((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={12} key="meta_equation_input_container">
          <TextField
            fullWidth
            defaultValue={equation.formula}
            key="meta_equation_input"
            sx={{ width: "100%" }}
            label="Equation"
            variant="outlined"
            size="small"
            onChange={(e) =>
              setNewEquation((prev) => ({ ...prev, formula: e.target.value }))
            }
          />
          <MathJaxContext config={config}>
            <MathJax hideUntilTypeset={"every"} inline dynamic>
              <h1 style={{ textAlign: "center" }}>{`$${equation.formula}$`}</h1>
            </MathJax>
          </MathJaxContext>
        </Grid>
      </Grid>
    );
  };

  return (
    <Card
      variant="elevation"
      elevation={5}
      sx={{ minWidth: 400, maxWidth: 800, m: "5%", px: "2%" }}
      // add padding
    >
      <CardContent>
        {/* add exit button on top left */}
        <Typography variant="h4" component="div" align="center">
          Equation Form Editor
        </Typography>
        {EquationMetaData(newEquation, setNewEquation)}
        <Container>
          <Typography variant="h6" component="div" align="center">
            Add Variables
          </Typography>
          {DisplayVariables(newEquation)}
        </Container>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item xs="auto">
            <Button variant="contained" color="error" onClick={() => {}}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setNewEquation(
                  Equation
                    ? Equation
                    : {
                        id: 0,
                        name: "",
                        description: "",
                        formula: "",
                        variables: [],
                      }
                );
              }}
            >
              reset
            </Button>
          </Grid>

          <Grid item xs="auto">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                createEquation({
                  variables: {
                    name: newEquation.name,
                    description: newEquation.description,
                    formula: newEquation.formula,
                    course: courseID,
                  },
                }).then((result) => {
                  newEquation.variables.forEach((variable) => {
                    createVariable({
                      variables: {
                        name: variable.name,
                        description: variable.description,
                        units: variable.units,
                        equation: result.data.createEquation.id,
                      },
                    });
                  });
                });
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default EquationFormEditor;
