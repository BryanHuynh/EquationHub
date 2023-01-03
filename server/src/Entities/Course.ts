import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Equations } from "./Equations";

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  uid!: string;

  @OneToMany((type) => Equations, (equation) => equation.course)
  equations!: Equations[];
}
