import { ICalculation } from "@/interfaces/ICalculation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Stack } from "@mui/material";
const katex = require("katex");

interface IProps {
  calculations: ICalculation[];
}

interface ICalculationsGroupedByFormula {
  [key: string]: ICalculation[];
}

export default function CalculationLogs({ calculations }: IProps) {
  const [groupByFormula, setGroupByFormula] = useState<boolean>(false);
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
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "gray",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const calculationsGroupedByFormula: ICalculationsGroupedByFormula =
    calculations.reduce(
      (acc: ICalculationsGroupedByFormula, calculation: ICalculation) => {
        if (acc[calculation.formula]) {
          acc[calculation.formula].push(calculation);
        } else {
          acc[calculation.formula] = [calculation];
        }
        return acc;
      },
      {}
    );
  const UnorderedLogs = () => {
    return (
      <>
        {calculations.map((calculation: ICalculation, index) => (
          <TableContainer
            component={Paper}
            key={index}
            sx={{ overflow: "visible" }}
          >
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    {" "}
                    <MathJaxContext config={config}>
                      <MathJax>`{calculation.formula}`</MathJax>
                    </MathJaxContext>
                  </StyledTableCell>
                  {Object.keys(calculation.variables).map(
                    (variable: string) => (
                      <StyledTableCell key={variable}>
                        <MathJaxContext config={config}>
                          <MathJax>`{variable}`</MathJax>
                        </MathJaxContext>
                      </StyledTableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <span>{calculation.formula}</span>
                  </TableCell>
                  {Object.values(calculation.variables).map(
                    (variable: string, index) => (
                      <TableCell key={index}>
                        <MathJaxContext config={config}>
                          <MathJax>`{variable}`</MathJax>
                        </MathJaxContext>
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </>
    );
  };

  const GroupByFormulaLogs = () => {
    return (
      <>
        {Object.keys(calculationsGroupedByFormula).map(
          (formula: string, index: number) => (
            <TableContainer
              component={Paper}
              sx={{ overflow: "visible" }}
              key={index}
            >
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell>Formula</StyledTableCell>
                    {Object.keys(
                      calculationsGroupedByFormula[formula][0].variables
                    ).map((variable: string) => (
                      <StyledTableCell key={variable}>
                        {variable}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calculationsGroupedByFormula[formula].map(
                    (calculation: ICalculation, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {calculation.id}
                        </TableCell>
                        <TableCell>
                          <span>{calculation.formula}</span>
                        </TableCell>
                        {Object.values(calculation.variables).map(
                          (variable: string, index: number) => (
                            <TableCell key={index}>{variable}</TableCell>
                          )
                        )}
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )
        )}
      </>
    );
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "column" }}
      sx={{ height: "25vh", overflow: "scroll", overflowX: "hidden" }}
    >
      {groupByFormula ? <GroupByFormulaLogs /> : <UnorderedLogs />}
    </Stack>
  );
}
