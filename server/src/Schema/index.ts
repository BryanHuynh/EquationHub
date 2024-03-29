import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  CREATE_EQUATION,
  DELETE_EQUATION,
  UPDATE_EQUATION,
} from "./Mutations/Equations";
import { CREATE_VARIABLE, DELETE_VARIABLE } from "./Mutations/Variables";
import {
  GET_EQUATION,
  GET_ALL_EQUATIONS_FROM_COURSE,
} from "./Queries/Equations";
import {
  GET_ALL_COURSES,
  GET_COURSE,
  GET_COURSES_BY_USER,
} from "./Queries/Course";
import { CREATE_COURSE, UPDATE_COURSE } from "./Mutations/Course";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getEquation: GET_EQUATION,
    getEquationsFromCourse: GET_ALL_EQUATIONS_FROM_COURSE,
    getAllCourses: GET_ALL_COURSES,
    getCourse: GET_COURSE,
    getCourseByUser: GET_COURSES_BY_USER,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEquation: CREATE_EQUATION,
    deleteEquation: DELETE_EQUATION,
    updateEquation: UPDATE_EQUATION,
    createVariable: CREATE_VARIABLE,
    deleteVariable: DELETE_VARIABLE,
    createCourse: CREATE_COURSE,
    updateCourse: UPDATE_COURSE,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
