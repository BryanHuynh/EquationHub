import EquationForm from "@/components/equationForm/equationForm";
import EquationFormEditor from "@/components/equationForm/EquationFormEditor";
import IEquation from "@/interfaces/IEquation";
import { useQuery, useMutation } from "@apollo/client";

import { GET_EQUATION, GET_ALL_EQUATIONS_FROM_COURSE } from "@/Graphql/Queries";
import { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import CoursesToolBar from "@/components/Navbar/CoursesToolBar";
import { ICalculation } from "@/interfaces/ICalculation";
import CalculationLogs from "@/components/CalculationLogs/calculationLogs";
import { useRouter } from "next/router";
import { Container } from "@mui/system";

export default function CoursePage({}) {
  const router = useRouter();
  const { course_id } = router.query;
  const [equations, setEquations] = useState<IEquation[]>([]);
  const [calculations, setCalculations] = useState<ICalculation[]>([]);

  const appendCalculationToLog = (calculation: ICalculation) => {
    setCalculations((prevCalculations) => [calculation, ...prevCalculations]);
  };

  const { data, loading } = useQuery(GET_ALL_EQUATIONS_FROM_COURSE, {
    variables: {
      course: parseInt(course_id as string),
    },
  });

  useEffect(() => {
    if (typeof data == "undefined") return;
    console.log(data.getEquationsFromCourse);
    setEquations(data.getEquationsFromCourse);
  }, [data]);

  if (typeof course_id !== "string" || loading) return <p>loading...</p>;

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <CoursesToolBar />
      <Container
        sx={{
          mt: 4,
          display: "flex",
          mx: 20,
        }}
      >
        <CssBaseline />
        <Grid container spacing={2}>
          {equations.map((equation, index) => (
            <Grid item xs={3} key={index}>
              <EquationForm
                key={index}
                Equation={equation}
                appendCalculationToLog={appendCalculationToLog}
              />
            </Grid>
          ))}
        </Grid>

        {/* <EquationFormEditor courseID={parseInt(course_id)} /> */}
      </Container>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <CalculationLogs calculations={calculations} />
      </div>
    </div>
  );
}
