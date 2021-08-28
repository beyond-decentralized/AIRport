import {
    Column,
    DbNumber,
    Entity,
    GeneratedValue,
    Id,
    JoinColumn,
    JoinColumns,
    OneToMany,
    Table
} from '@airport/air-control'
import { Child } from './Child'

@Entity()
export class Parent {

    @Id()
	@GeneratedValue()
    id: number

    bool: boolean

    num: number

    str: string

    @OneToMany()
    children: Child[]

}
