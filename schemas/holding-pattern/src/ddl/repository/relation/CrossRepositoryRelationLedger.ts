import { DdlRelation } from "@airport/airspace/dist/app/bundle";
import { ICrossRepositoryRelationLedger } from "@airport/ground-control";
import { Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";
import { InternalAirEntity } from "../../infrastructure/InternalAirEntity";
import { Repository } from "../Repository";

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
