import { ILocalCopyReplacementLedger } from "@airport/ground-control";
import { Entity, Id, JoinColumns, ManyToOne, Table } from "@airport/tarmaq-entity";
import { CopiedRecordLedger } from "./CopiedRecordLedger";

@Entity()
@Table({ name: 'LOCAL_COPY_REPLACEMENT_LEDGER' })
export class LocalCopyReplacementLedger
    implements ILocalCopyReplacementLedger {

    @Id()
    @ManyToOne()
    @JoinColumns([
        { name: 'ACTOR_RECORD_ID', referencedColumnName: 'ACTOR_RECORD_ID', nullable: false },
        { name: 'ACTOR_LID', referencedColumnName: 'ACTOR_LID', nullable: false },
        { name: 'REPOSITORY_LID', referencedColumnName: 'REPOSITORY_LID', nullable: false }
    ])
    copiedRecordLedger: CopiedRecordLedger

}
