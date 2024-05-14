import { IEntityQueryRecord_QueryNumber } from "@airport/ground-control"
import { DbNumber, Entity, GeneratedValue, Id, Table } from "@airport/tarmaq-entity"

/**
 * A temporary table needed to generate a sequence for query numbers.
 * No records are actually inserted into it.
 */
@Entity()
@Table({ name: 'COPIED_ENTITY_QUERIES' })
export class CopiedEntityQuery {

    @Id()
    @GeneratedValue()
    @DbNumber()
    queryNumber: IEntityQueryRecord_QueryNumber

}
