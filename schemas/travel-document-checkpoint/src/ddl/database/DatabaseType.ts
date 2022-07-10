import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from '@airport/tarmaq-entity'
import { Type } from '../type/Type'
import { Database } from './Database'

@Entity()
@Table({
    name: 'DATABASE_TYPE'
})
export class DatabaseType {

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'DATABASE_LID',
        referencedColumnName: 'DATABASE_LID', nullable: true
    })
    database: Database

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'TYPE_ID',
        referencedColumnName: 'TYPE_ID', nullable: true
    })
    type: Type

}