import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { GraphQLList } from "graphql";
import { variableType } from "./Variables";

export const equationType = new GraphQLObjectType({
  name: "Equations",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    formula: { type: GraphQLString },
    description: { type: GraphQLString },
    course: { type: GraphQLID },
    variables: { type: new GraphQLList(variableType) },
  }),
});
