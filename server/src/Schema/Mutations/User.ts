import { GraphQLString } from "graphql";
import { userType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";

export const CREATE_USER = {
  type: userType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;
    await Users.insert({
      name,
      username,
      password,
    });
    return args;
  },
};

export const DELETE_USER = {
  type: userType,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    await Users.delete(id);
    return args;
  },
};
