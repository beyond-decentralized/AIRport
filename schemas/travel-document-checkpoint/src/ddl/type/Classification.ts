import {
    Column,
    Entity,
    Id,
    Table
} from '@airport/tarmaq-entity'

export type Classification_Id = number
@Entity()
@Table({
    name: 'CLASSIFICATIONS'
})
export class Classification {

    @Id()
    @Column({ name: 'CLASSIFICATION_ID' })
    id: Classification_Id

    name: string

}
