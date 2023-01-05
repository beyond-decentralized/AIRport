import { AirEntity } from "@airport/final-approach";
import { Column, Entity, OneToMany, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'MANY_TO_ONE_LEDGER' })
export class ManyToOneLedger extends AirEntity {

}
