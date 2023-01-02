import { GraphQLString } from "graphql";
import { Course } from "../../Entities/Course";
import { courseType } from "../TypeDefs/Course";

export const CREATE_COURSE = {
  type: courseType,
  args: {
    name: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name } = args;
    const res = await Course.insert({
      name,
    });
    const id = res.identifiers[0].id;
    return { id: res.identifiers[0].id, name };
  },
};

export const DELETE_COURSE = {
  type: courseType,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    const res = await Course.delete(id);
    return { id };
  },
};

export const UPDATE_COURSE = {
  type: courseType,
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id, name } = args;
    const res = await Course.update(id, { name });
    return { id, name };
  },
};
