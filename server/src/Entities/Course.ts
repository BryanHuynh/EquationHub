import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Equations } from "./Equations";

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany((type) => Equations, (equation) => equation.course)
  equations!: Equations[];
}
