import { IClientType } from '@airport/ground-control'
import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/tarmaq-entity'
import { Type } from '../type/Type'
import { Client } from './Client'

@Entity()
@Table({
    name: 'CLIENT_TYPES'
})
export class ClientType
    implements IClientType {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'CLIENT_LID' })
    client: Client

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TYPE_ID' })
    type: Type

}
