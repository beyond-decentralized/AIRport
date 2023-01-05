import { AirEntity } from "@airport/final-approach";
import { Column, Entity, OneToMany, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'COPIED_RECORD_LEDGER' })
export class CopiedRecordLedger extends AirEntity {

}
