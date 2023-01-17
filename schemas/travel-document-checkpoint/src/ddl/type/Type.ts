import { Type_Id, Type_Name } from '@airport/ground-control'
import {
    Column,
    DbNumber,
    DbString,
    Entity,
    Id,
    OneToMany,
    Table
} from '@airport/tarmaq-entity'
import { TypeClassification } from './TypeClassification'

/**
 * Generic Type (can be applied to any entities)
 */
@Entity()
@Table({
    name: 'TYPES'
})
export class Type {

    @Id()
    @Column({ name: 'TYPE_ID', nullable: false })
    @DbNumber()
    id?: Type_Id

    @Column({ name: 'TYPE_NAME', nullable: false })
    @DbString()
    name?: Type_Name

    @OneToMany({ mappedBy: 'type' })
    typeClassifications?: TypeClassification[]

}
