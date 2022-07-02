import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/air-traffic-control'
import { Type } from '../type/Type'
import { Database } from './Database'

@Entity()
@Table({
    name: 'DATABASE_TYPE'
})
export class DatabaseType {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'DATABASE_ID', referencedColumnName: 'ID', nullable: true })
    database: Database

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TYPE_ID', referencedColumnName: 'ID', nullable: true })
    type: Type

}
