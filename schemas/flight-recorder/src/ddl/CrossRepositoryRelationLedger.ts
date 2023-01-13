import { ApplicationRelation } from "@airport/airspace";
import { AirEntity } from "@airport/final-approach";
import { Repository } from "@airport/holding-pattern";
import { Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'CROSS_REPOSITORY_RELATION_LEDGER' })
export class CrossRepositoryRelationLedger
    extends AirEntity {

    @ManyToOne()
    @JoinColumn({
        name: 'ONE_SIDE_APPLICATION_RELATION_LID',
        referencedColumnName: 'APPLICATION_RELATION_LID'
    })
    relation: ApplicationRelation

    @ManyToOne()
    @JoinColumn({
        name: 'RELATION_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    relatedRepository: Repository

}
