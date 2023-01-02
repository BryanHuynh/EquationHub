import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Equations } from "./Equations";

@Entity()
export class Variables extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  units!: string;

  @Column()
  description!: string;

  @Column()
  order!: number;

  @ManyToOne((type) => Equations, (equation) => equation.variables)
  equation!: Equations;
}
