import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Variables } from "./Variables";
import { Course } from "./Course";

@Entity()
export class Equations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  formula!: string;

  @Column()
  description!: string;

  @OneToMany((type) => Variables, (variables) => variables.equation)
  variables!: Variables[];

  @ManyToOne((type) => Course, (course) => course.equations)
  course!: Course;
}
