import IVariable from "./IVariables";

export default interface IEquation {
  id: number;
  name: string;
  description?: string;
  formula: string;
  variables: IVariable[];
}
