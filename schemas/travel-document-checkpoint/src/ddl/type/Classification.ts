import {
    Column,
    Entity,
    Id,
    Table
} from '@airport/air-traffic-control'

@Entity()
@Table({
    name: 'CLASSIFICATIONS'
})
export class Classification {

    @Id()
    @Column({ name: 'CLASSIFICATION_ID' })
    id: number

    name: string

}
