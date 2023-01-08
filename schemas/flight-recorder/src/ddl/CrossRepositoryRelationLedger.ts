import { ApplicationRelation } from "@airport/airspace";
import { AirEntity } from "@airport/final-approach";
import { Actor, Repository } from "@airport/holding-pattern";
import { Column, Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'CROSS_REPOSITORY_RELATION_LEDGER' })
export class CrossRepositoryRelationLedger
    extends AirEntity {

    @ManyToOne()
    @JoinColumn({
        name: 'ONE_SIDE_APPLICATION_RELATION_LID',
        referencedColumnName: 'APPLICATION_RELATION_LID'
    })
    oneSideRelation: ApplicationRelation

    @Column({ name: 'ONE_SIDE_ACTOR_RECORD_ID' })
    oneSideActorRecordId: number

    @ManyToOne()
    @JoinColumn({
        name: 'ONE_SIDE_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID',
        nullable: false
    })
    oneSideActor: Actor

    @ManyToOne()
    @JoinColumn({
        name: 'ONE_SIDE_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    oneSideRepository: Repository

    @ManyToOne()
    @JoinColumn({
        name: 'MANY_SIDE_APPLICATION_RELATION_LID',
        referencedColumnName: 'APPLICATION_RELATION_LID',
        nullable: false
    })
    manySideRelation: ApplicationRelation

    @Column({ name: 'MANY_SIDE_ACTOR_RECORD_ID' })
    manySideActorRecordId: number

    @ManyToOne()
    @JoinColumn({
        name: 'MANY_SIDE_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID',
        nullable: false
    })
    manySideActor: Actor

    @ManyToOne()
    @JoinColumn({
        name: 'MANY_SIDE_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    manySideRepository: Repository

}
