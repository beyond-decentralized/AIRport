import { DdlColumn } from '@airport/airspace'
import { EntityRelationRecord_IntegerdId, IEntityRelationRecord } from "@airport/ground-control"
import { Column, DbNumber, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/tarmaq-entity"
import { EntityRecord } from "./EntityRecord"
import { CopiedEntityRecordReference } from './CopiedEntityRecordReference'

@Table({ name: 'ENTITY_RELATIONS' })
@Entity()
export class EntityRelationRecord
    implements IEntityRelationRecord {

    @Id()
    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'INTEGER_LID', nullable: false })
    // Space-saving foreign key for CopiedEntityRepositoryRecord
    integerId: EntityRelationRecord_IntegerdId

    @ManyToOne()
    @JoinColumn({ name: 'REFERENCED_RECORD_INTEGER_ID', referencedColumnName: 'INTEGER_LID' })
    referencedRecord: EntityRecord

    @ManyToOne()
    @JoinColumn({ name: 'REFERENCING_DB_COLUMN_LID', referencedColumnName: 'DB_COLUMN_LID' })
    referencingColumn: DdlColumn

    @ManyToOne()
    @JoinColumn({ name: 'REFERENCING_RECORD_INTEGER_ID', referencedColumnName: 'INTEGER_LID' })
    referencingRecord: EntityRecord

    @OneToMany({ mappedBy: "copiedEntityRelationRecord" })
    copiedEntityRecordReferences: CopiedEntityRecordReference[]

}
