import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity() // Add parentheses after @Entity
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}