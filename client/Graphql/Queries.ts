import { gql } from "@apollo/client";

export const GET_EQUATION = gql`
  query GetEquation($id: ID!) {
    getEquation(id: $id) {
      name
      description
      formula
      variables {
        name
        units
        description
      }
    }
  }
`;

export const GET_ALL_EQUATIONS_FROM_COURSE = gql`
  query getEquationsFromCourse($course: ID!) {
    getEquationsFromCourse(course: $course) {
      id
      name
      description
      formula
      variables {
        name
        units
        description
      }
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses {
    getAllCourses {
      id
      name
    }
  }
`;
