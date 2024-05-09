import { ICopiedEntityQueryRecord, ICopiedEntityQueryRecord_QueryNumber } from "@airport/ground-control"
import { DbNumber, Entity, Id, JoinColumns, ManyToOne, Table } from "@airport/tarmaq-entity"
import { CopiedEntityRecord } from "./CopiedEntityRecord"

/**
 * A table for temporary per-query records with identifiers of copied repository entity records
 * to be checked. Allows to check which records are copies.
 */
@Entity()
@Table({ name: 'COPIED_ENTITY_QUERIY_RECORDS' })
export class CopiedEntityQueryRecord
    implements ICopiedEntityQueryRecord {

    @Id()
    @ManyToOne()
    @JoinColumns([
        { name: 'COPY_ACTOR_RECORD_ID', referencedColumnName: 'ACTOR_RECORD_ID', nullable: false },
        { name: 'COPY_ACTOR_LID', referencedColumnName: 'ACTOR_LID', nullable: false },
        { name: 'COPY_REPOSITORY_LID', referencedColumnName: 'REPOSITORY_LID', nullable: false },
        { name: 'COPY_DB_ENTITY_LID', referencedColumnName: 'COPY_DB_ENTITY_LID', nullable: false }
    ])
    // Here the join columns refer to the record ids because the uniqueId won't be available at
    // query time (and space savings aren't needed - records in this table are temporary).
    copiedEntityRecord: CopiedEntityRecord

    @Id()
    @DbNumber()
    queryNumber: ICopiedEntityQueryRecord_QueryNumber

}
