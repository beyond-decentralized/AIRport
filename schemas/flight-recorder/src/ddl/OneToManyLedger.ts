import { AirEntity } from "@airport/final-approach";
import { Column, Entity, OneToMany, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'ONE_TO_MANY_LEDGER' })
export class OneToManyLedger extends AirEntity {

}
