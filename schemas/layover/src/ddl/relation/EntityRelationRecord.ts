import { DdlColumn } from '@airport/airspace'
import { IEntityRelationRecord } from "@airport/ground-control"
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity"
import { EntityRecord } from "./EntityRecord"

@Table({ name: 'ENTITY_RELATIONS' })
@Entity()
export class EntityRelationRecord
    implements IEntityRelationRecord {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'REFERENCED_RECORD_INTEGER_ID', referencedColumnName: 'INTEGER_LID' })
    referencedRecord: EntityRecord

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'REFERENCING_DB_COLUMN_LID', referencedColumnName: 'DB_COLUMN_LID' })
    referencingColumn: DdlColumn

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'REFERENCING_RECORD_INTEGER_ID', referencedColumnName: 'INTEGER_LID' })
    referencingRecord: EntityRecord

}