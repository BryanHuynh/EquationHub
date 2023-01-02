import { GraphQLID, GraphQLString } from "graphql";
import { Variables } from "../../Entities/Variables";
import { variableType } from "../TypeDefs/Variables";

export const CREATE_VARIABLE = {
  type: variableType,
  args: {
    equation: { type: GraphQLID },
    name: { type: GraphQLString },
    units: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { equation, name, units, description } = args;
    await Variables.insert({
      name,
      units,
      description,
      equation,
    });
    return args;
  },
};

export const DELETE_VARIABLE = {
  type: variableType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    await Variables.delete(id);
    return args;
  },
};
