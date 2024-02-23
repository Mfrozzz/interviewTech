import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pilares')
export default class Pilar{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    description: string;
}