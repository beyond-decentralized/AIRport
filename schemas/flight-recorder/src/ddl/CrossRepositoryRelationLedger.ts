import { DdlRelation } from "@airport/airspace/dist/app/bundle";
import { ICrossRepositoryRelationLedger } from "@airport/ground-control";
import { Repository } from "@airport/holding-pattern";
import { InternalAirEntity } from "@airport/holding-pattern/dist/app/bundle";
import { Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'CROSS_REPOSITORY_RELATION_LEDGER' })
export class CrossRepositoryRelationLedger
    extends InternalAirEntity
    implements ICrossRepositoryRelationLedger {

    @ManyToOne()
    @JoinColumn({
        name: 'ONE_SIDE_APPLICATION_RELATION_LID',
        referencedColumnName: 'DB_RELATION_LID'
    })
    relation: DdlRelation

    @ManyToOne()
    @JoinColumn({
        name: 'RELATION_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    relatedRepository: Repository

}
