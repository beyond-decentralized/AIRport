import { IDatabaseType } from '@airport/ground-control'
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
export class DatabaseType
    implements IDatabaseType {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'DATABASE_LID', nullable: true })
    database: Database

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'TYPE_ID', nullable: true })
    type: Type

}
