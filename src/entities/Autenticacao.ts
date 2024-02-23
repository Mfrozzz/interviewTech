import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('autenticacao')
export default class Autenticacao{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    password: string;
}