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
import { Level2 } from './Level2'

@Entity()
export class Level1 {

    @Id()
	@GeneratedValue()
    id: number

    bool: boolean

    num: number

    str: string

    @OneToMany()
    contained: Level2[]

}
