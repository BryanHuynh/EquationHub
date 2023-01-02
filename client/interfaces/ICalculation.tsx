export interface ICalculation {
  id: number;
  formula: string;
  variables: { [name: string]: string };
}
