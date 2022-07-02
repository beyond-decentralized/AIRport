import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/air-traffic-control'
import { Type } from '../type/Type'
import { Client } from './Client'

@Entity()
@Table({
    name: 'CLIENT_TYPES'
})
export class ClientType {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'CLIENT_ID', referencedColumnName: 'ID' })
    client: Client

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TYPE_ID', referencedColumnName: 'ID' })
    type: Type

}
