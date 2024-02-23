import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('resposta')
export default class Resposta{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    answer: string;
}