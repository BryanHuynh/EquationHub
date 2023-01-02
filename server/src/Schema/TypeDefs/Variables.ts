import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";

export const variableType = new GraphQLObjectType({
  name: "Variable",
  fields: () => ({
    id: { type: GraphQLID },
    equation: { type: GraphQLID },
    name: { type: GraphQLString },
    units: { type: GraphQLString },
    order: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});
