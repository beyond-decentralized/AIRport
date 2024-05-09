import { DdlEntity } from "@airport/airspace/dist/app/bundle";
import { AirEntityId } from "@airport/final-approach/dist/app/bundle";
import { CopiedEntityRecord_IntegerdId, ICopiedEntityRecord } from "@airport/ground-control";
import { Column, DbNumber, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/tarmaq-entity";
import { CopiedEntityRepositoryRecord } from "./CopiedEntityRepositoryRecord";
import { CopiedEntityQueryRecord } from "./CopiedEntityQueryRecord";

/**
 * A record of all entities that are currently copied from other repositories
 * and those repositories are not loaded locally.
 */
@Entity()
@Table({ name: 'COPIED_ENTITY_RECORDS' })
export class CopiedEntityRecord
    extends AirEntityId
    implements ICopiedEntityRecord {

    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'INTEGER_LID', nullable: false })
    // Space-saving foreign key for CopiedEntityRepositoryRecord
    integerdId: CopiedEntityRecord_IntegerdId

    @ManyToOne()
    @JoinColumn({
        name: 'COPY_DB_ENTITY_LID',
        referencedColumnName: 'DB_ENTITY_LID',
        nullable: false
    })
    copyDdlEntity: DdlEntity

    @OneToMany({ mappedBy: 'copiedEntityRecord' })
    copiedEntityRecordRepositories: CopiedEntityRepositoryRecord[] = []

    @OneToMany({ mappedBy: 'copiedEntityRecord' })
    copiedEntityRecordQueries: CopiedEntityQueryRecord[] = []

}
