import { GraphQLString, GraphQLList, GraphQLID } from "graphql";
import { Equations } from "../../Entities/Equations";
import { Variables } from "../../Entities/Variables";
import { equationType } from "../TypeDefs/Equations";
import { messageType } from "../TypeDefs/Messages";
import { variableType } from "../TypeDefs/Variables";

export const CREATE_EQUATION = {
  type: equationType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    formula: { type: GraphQLString },
    course: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { course, name, description, formula } = args;
    console.log(args);

    const res = await Equations.insert({
      name,
      formula,
      description,
      course,
    });
    const id = res.identifiers[0].id;
    return { id: res.identifiers[0].id, course, name, description, formula };
  },
};

export const DELETE_EQUATION = {
  type: messageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    console.log("deleting equation: " + id);
    const variables = await Variables.createQueryBuilder("variables")
      .where("variables.equation = :id", { id: id })
      .getMany();

    if (variables.length > 0) {
      variables.forEach(async (variable) => {
        await Variables.delete(variable.id);
      });
    }

    await Equations.delete(id);
    return { successful: true, message: "Equation deleted" };
  },
};

export const UPDATE_EQUATION = {
  type: equationType,
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    formula: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id, name, description, formula } = args;
    const res = await Equations.update(id, { name, description, formula });
    return { id, name, description, formula };
  },
};
