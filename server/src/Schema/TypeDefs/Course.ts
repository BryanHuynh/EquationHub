import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { GraphQLList } from "graphql";
import { equationType } from "./Equations";

export const courseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    equations: { type: new GraphQLList(equationType) },
  }),
});
