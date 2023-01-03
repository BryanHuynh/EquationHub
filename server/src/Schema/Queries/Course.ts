import { GraphQLID, GraphQLList } from "graphql";
import { Course } from "../../Entities/Course";
import { courseType } from "../TypeDefs/Course";

export const GET_ALL_COURSES = {
  type: new GraphQLList(courseType),
  async resolve(parent: any, args: any) {
    return await Course.find();
  },
};

export const GET_COURSE = {
  type: courseType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    return await Course.createQueryBuilder("course")
      .leftJoinAndSelect("course.equations", "equations")
      .where("course.id = :id", { id })
      .getOne();
  },
};

export const GET_COURSES_BY_USER = {
  type: new GraphQLList(courseType),
  args: {
    user: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { uid } = args;
    return await Course.find({ where: { uid } });
  },
};
