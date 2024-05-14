import { IEntityQueryRecord, IEntityQueryRecord_QueryNumber } from "@airport/ground-control"
import { DbNumber, Entity, Id, JoinColumns, ManyToOne, Table } from "@airport/tarmaq-entity"
import { EntityRecord } from "./EntityRecord"

/**
 * A table for temporary per-query records with identifiers of copied repository entity records
 * to be checked. Allows to check which records are copies.
 */
@Entity()
@Table({ name: 'ENTITY_QUERIY_RECORDS' })
export class EntityQueryRecord
    implements IEntityQueryRecord {

    @Id()
    @ManyToOne()
    @JoinColumns([
        { name: 'ACTOR_RECORD_ID', referencedColumnName: 'ACTOR_RECORD_ID', nullable: false },
        { name: 'ACTOR_LID', referencedColumnName: 'ACTOR_LID', nullable: false },
        { name: 'REPOSITORY_LID', referencedColumnName: 'REPOSITORY_LID', nullable: false },
        { name: 'DB_ENTITY_LID', referencedColumnName: 'DB_ENTITY_LID', nullable: false }
    ])
    // Here the join columns refer to the record ids because the uniqueId won't be available at
    // query time (and space savings aren't needed - records in this table are temporary).
    entityRecord: EntityRecord

    @Id()
    @DbNumber()
    queryNumber: IEntityQueryRecord_QueryNumber

}
