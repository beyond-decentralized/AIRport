import {
    Entity,
    Id,
    OneToMany,
    Table
} from '@airport/air-traffic-control'
import { TypeClassification } from './TypeClassification'

@Entity()
@Table({
    name: 'TYPES'
})
export class Type {

    @Id()
    id: number

    name: string

    @OneToMany({ mappedBy: 'type' })
    typeClassifications: TypeClassification[]

}
