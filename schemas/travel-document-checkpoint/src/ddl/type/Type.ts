import {
    Column,
    Entity,
    Id,
    OneToMany,
    Table
} from '@airport/air-traffic-control'
import { TypeClassification } from './TypeClassification'

export type Type_Id = number

@Entity()
@Table({
    name: 'TYPES'
})
export class Type {

    @Id()
    @Column({ name: 'TYPE_ID' })
    id: number

    name: string

    @OneToMany({ mappedBy: 'type' })
    typeClassifications: TypeClassification[]

}
