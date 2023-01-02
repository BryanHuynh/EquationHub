import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation CreateCourse($name: String!) {
    createCourse(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_EQUATION = gql`
  mutation CreateEquation(
    $name: String!
    $description: String!
    $formula: String!
    $course: ID!
  ) {
    createEquation(
      name: $name
      description: $description
      formula: $formula
      course: $course
    ) {
      id
      name
      description
      formula
      course
    }
  }
`;

export const CREATE_VARIABLE = gql`
  mutation CreateVariable(
    $name: String!
    $units: String!
    $description: String!
    $equation: ID!
  ) {
    createVariable(
      name: $name
      units: $units
      description: $description
      equation: $equation
    ) {
      id
      name
      units
      description
      equation
    }
  }
`;

export const DELETE_EQUATION = gql`
  mutation DeleteEquation($id: ID!) {
    deleteEquation(id: $id) {
      successful
    }
  }
`;
