import { ICopiedEntityRepositoryRecord } from "@airport/ground-control"
import { Repository } from "@airport/holding-pattern/dist/app/bundle"
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity"
import { EntityRecord } from "./EntityRecord"

/**
 * A record of which repository has a given CopiedEntityRecord in them.
 * 
 * Will be needed once repository unloading is supported.  Once all repositories
 * with a given record copy are unloaded that record copy needs to be
 * removed as well.
 */
@Entity()
@Table({ name: 'COPIED_ENTITY_REPOSITORY_RECORD' })
export class CopiedEntityRepositoryRecord
    implements ICopiedEntityRepositoryRecord {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'INTEGER_LID', referencedColumnName: 'INTEGER_LID', nullable: false })
    entityRecord: EntityRecord

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'COPYING_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    repositoryWithCopy: Repository

}
