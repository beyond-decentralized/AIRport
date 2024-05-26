import { DdlEntity } from "@airport/airspace/dist/app/bundle"
import { AirEntityId } from "@airport/final-approach/dist/app/bundle"
import { EntityRecord_IntegerdId, EntityRecord_IsACopy, IEntityRecord } from "@airport/ground-control"
import { Column, DbBoolean, DbNumber, Entity, GeneratedValue, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/tarmaq-entity"
import { CopiedEntityRecordReference } from "./CopiedEntityRecordReference"
import { EntityQueryRecord } from "./EntityQueryRecord"
import { EntityRelationRecord } from "./EntityRelationRecord"

/**
 * A record of all entities that are currently loaded into the database.
 */
@Entity()
@Table({ name: 'ENTITY_RECORDS' })
export class EntityRecord
    extends AirEntityId
    implements IEntityRecord {

    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'INTEGER_LID', nullable: false })
    // Space-saving foreign key for CopiedEntityRepositoryRecord
    integerId: EntityRecord_IntegerdId

    @Column({ name: 'IS_A_COPY', nullable: false })
    @DbBoolean()
    isACopy: EntityRecord_IsACopy

    @ManyToOne()
    @JoinColumn({ name: 'DB_ENTITY_LID', nullable: false })
    ddlEntity: DdlEntity

    @OneToMany({ mappedBy: 'referencedRecord' })
    referencedRecordRelations: EntityRelationRecord[]

    @OneToMany({ mappedBy: 'referencingRecord' })
    referencingRecordRelations: EntityRelationRecord[]

    @OneToMany({ mappedBy: 'referencingEntityRecord' })
    copiedRecordReferences: CopiedEntityRecordReference[] = []

    @OneToMany({ mappedBy: 'entityRecord' })
    entityRecordQueries: EntityQueryRecord[] = []

}
