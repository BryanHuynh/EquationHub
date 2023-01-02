import { GraphQLList } from "graphql";
import { userType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";

export const GET_ALL_USERS = {
  type: new GraphQLList(userType),
  resolve() {
    return Users.find();
  },
};
