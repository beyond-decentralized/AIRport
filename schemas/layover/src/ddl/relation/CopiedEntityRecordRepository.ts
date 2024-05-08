import { ICopiedEntityRecordRepository } from "@airport/ground-control"
import { Repository } from "@airport/holding-pattern/dist/app/bundle"
import { Entity, Id, JoinColumn, JoinColumns, ManyToOne, Table } from "@airport/tarmaq-entity"
import { CopiedEntityRecord } from "./CopiedEntityRecord"

/**
 * A record of which repository has a given CopiedEntityRecord in them.
 * 
 * Will be needed once repository unloading is supported.  Once all repositories
 * with a given record copy are unloaded that record copy needs to be
 * removed as well.
 */
@Entity()
@Table({ name: 'COPIED_ENTITY_RECORD_REPOSITORY' })
export class CopiedEntityRecordRepository
    implements ICopiedEntityRecordRepository {

    @Id()
    @ManyToOne()
    @JoinColumns([
        { name: 'COPY_ACTOR_RECORD_ID', referencedColumnName: 'ACTOR_RECORD_ID', nullable: false },
        { name: 'COPY_ACTOR_LID', referencedColumnName: 'ACTOR_LID', nullable: false },
        { name: 'COPY_REPOSITORY_LID', referencedColumnName: 'REPOSITORY_LID', nullable: false },
        { name: 'COPY_DB_ENTITY_LID', referencedColumnName: 'COPY_DB_ENTITY_LID', nullable: false }
    ])
    copiedEntityRecord: CopiedEntityRecord

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'COPYING_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    repositoryWithCopy: Repository

}
