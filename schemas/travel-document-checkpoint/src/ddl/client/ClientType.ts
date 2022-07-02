import {
    Entity,
    Id,
    Table
} from '@airport/air-traffic-control'

@Entity()
@Table({
    name: 'CLIENT_TYPE'
})
export class ClientType {

    @Id()
    id: number

    name: string

}
