import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import { schema } from "./Schema";
import { Users } from "./Entities/Users";
import { Equations } from "./Entities/Equations";
import { Variables } from "./Entities/Variables";
import { Course } from "./Entities/Course";
require("dotenv").config();

const main = async () => {
  await createConnection({
    type: "mysql",
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
    logging: false,
    synchronize: true,
    entities: [Users, Equations, Variables, Course],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  app.listen(3001, () => {
    console.log("Server started on localhost:3001");
  });
};

main().catch((err) => {
  console.error(err);
});
