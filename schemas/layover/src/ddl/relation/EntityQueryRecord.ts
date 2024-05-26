import { IEntityQueryRecord, IEntityQueryRecord_QueryNumber } from "@airport/ground-control"
import { DbNumber, Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity"
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
    @JoinColumn({ name: 'ENTITY_RECORD_INTEGER_LID', referencedColumnName: 'INTEGER_LID', nullable: false })
    // Here the join columns refer to the record ids because the uniqueId won't be available at
    // query time (and space savings aren't needed - records in this table are temporary).
    entityRecord: EntityRecord

    @Id()
    @DbNumber()
    queryNumber: IEntityQueryRecord_QueryNumber

}
