import { DdlEntity } from "@airport/airspace/dist/app/bundle";
import { AirEntityId } from "@airport/final-approach/dist/app/bundle";
import { ICopiedEntityRecord } from "@airport/ground-control";
import { Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/tarmaq-entity";
import { CopiedEntityRecordRepository } from "./CopiedEntityRecordRepository";

/**
 * A record of all entities that are currently copied from other repositories
 * and those repositories are not loaded locally.
 */
@Entity()
@Table({ name: 'COPIED_ENTITY_RECORD' })
export class CopiedEntityRecord
    extends AirEntityId
    implements ICopiedEntityRecord {

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'COPY_DB_ENTITY_LID',
        referencedColumnName: 'DB_ENTITY_LID',
        nullable: false
    })
    copyDdlEntity: DdlEntity

    @OneToMany({ mappedBy: 'copiedEntityRecord'})
    copiedEntityRecordRepositories: CopiedEntityRecordRepository[] = []

}
