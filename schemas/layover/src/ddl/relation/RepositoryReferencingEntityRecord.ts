import { IRepositoryReferencingEntityRecord } from "@airport/ground-control"
import { Repository } from "@airport/holding-pattern/dist/app/bundle"
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity"
import { EntityRecord } from "./EntityRecord"

/**
 * A record of which repository has a a referece to a given Entity.
 * 
 * This applies to all records that can be referenced from the records
 * in a given repository, even if they are nested (at any level).
 * 
 * These referces can exist on external records copied into a
 * repository or on records of repositories that are loaded into the
 * local database.
 * 
 * When a repository that previously (locally) can copy records is
 * loaded, this entries in this table are checked for nested records
 * that are no longer referenced from the referencing repository.
 * If there are old copy records that are now not referenced at
 * all, they are deleted.
 * 
 * 1)  Gather all of the record and table ids of the newly
 * loaded repository.  Insert them into a temporary table.
 * 2) Check those ids against already present (copied) records
 * 3) Load the reference trees for the old and new
 * versions of the repository (up to the referencing repositories).
 * 4) If there are records that are no longer present or are no longer
 * in the reference trees (computed above), replace
 * the references to to old record with the references to new
 * new record (if any) and update the relations.
 */
@Entity()
@Table({ name: 'REPOSITORY_REFERENCING_ENTITY_RECORDS' })
export class RepositoryReferencingEntityRecord
    implements IRepositoryReferencingEntityRecord {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'ENTITY_INTEGER_LID', referencedColumnName: 'INTEGER_LID', nullable: false })
    entityRecord: EntityRecord

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'REFERENCING_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    referencingRepository: Repository

}
