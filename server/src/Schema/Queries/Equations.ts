import { GraphQLID, GraphQLList } from "graphql";
import { Equations } from "../../Entities/Equations";
import { equationType } from "../TypeDefs/Equations";

export const GET_EQUATION = {
  type: equationType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    return await Equations.createQueryBuilder("equations")
      .leftJoinAndSelect("equations.variables", "variables")
      .where("equations.id = :id", { id })
      .getOne();
  },
};

export const GET_ALL_EQUATIONS_FROM_COURSE = {
  type: new GraphQLList(equationType),
  args: {
    course: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { course } = args;
    return await Equations.createQueryBuilder("equations")
      .leftJoinAndSelect("equations.variables", "variables")
      .where("equations.course = :course", { course })
      .getMany();
  },
};
