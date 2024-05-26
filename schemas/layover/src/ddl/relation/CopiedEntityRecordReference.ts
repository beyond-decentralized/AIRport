import { ICopiedEntityRecordReference } from "@airport/ground-control"
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity"
import { EntityRelationRecord } from "./EntityRelationRecord"
import { EntityRecord } from "./EntityRecord"

/**
 * A record of which repository record has a a referece to a given
 * Copied Entity.
 * 
 * This applies to all records that can be Copied records that
 * referenced from the records in a given repository, even if they are
 * nested (at any level).
 * 
 * These referces can exist only on external records copied into a
 * repository.
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
@Table({ name: 'COPIED_ENTITY_RECORD_REFERENCES' })
export class CopiedEntityRecordReference
    implements ICopiedEntityRecordReference {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'COPIED_ENTITY_RELATION_INTEGER_LID', referencedColumnName: 'INTEGER_LID', nullable: false })
    copiedEntityRelationRecord: EntityRelationRecord

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'REFERENCING_ENTITY_INTEGER_LID',
        referencedColumnName: 'INTEGER_LID',
        nullable: false
    })
    referencingEntityRecord: EntityRecord

}
