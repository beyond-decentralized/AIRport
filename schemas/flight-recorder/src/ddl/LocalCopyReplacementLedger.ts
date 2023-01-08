import { Entity, Id, JoinColumns, ManyToOne, Table } from "@airport/tarmaq-entity";
import { CopiedRecordLedger } from "./CopiedRecordLedger";

@Entity()
@Table({ name: 'LOCAL_COPY_REPLACEMENT_LEDGER' })
export class LocalCopyReplacementLedger {

    @Id()
    @ManyToOne()
    @JoinColumns([
        { name: 'ACTOR_RECORD_ID', referencedColumnName: 'ACTOR_RECORD_ID' },
        { name: 'ACTOR_LID', referencedColumnName: 'ACTOR_LID' },
        { name: 'REPOSITORY_LID', referencedColumnName: 'REPOSITORY_LID' }
    ])
    copiedRecordLedger: CopiedRecordLedger

}