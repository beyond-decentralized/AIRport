import {
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
    id: number

    name: string

}
