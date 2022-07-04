import {
    Column,
    Entity,
    Id,
    Table
} from '@airport/air-traffic-control'

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
