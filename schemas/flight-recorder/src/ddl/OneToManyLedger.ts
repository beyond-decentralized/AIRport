import { ApplicationEntity } from "@airport/airspace";
import { AirEntity } from "@airport/final-approach";
import { Actor, Repository } from "@airport/holding-pattern";
import { Column, Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'ONE_TO_MANY_LEDGER' })
export class OneToManyLedger extends AirEntity {

    @ManyToOne()
    @JoinColumn({
        name: 'ONE_SIDE_APPLICATION_ENTITY_LID',
        referencedColumnName: 'APPLICATION_ENTITY_LID'
    })
    oneSideEntity: ApplicationEntity

    @Column({ name: 'ONE_SIDE_ACTOR_RECORD_ID' })
    oneSideActorRecordId: number

    @ManyToOne()
    @JoinColumn({
        name: 'ONE_SIDE_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID'
    })
    oneSideActor: Actor

    @ManyToOne()
    @JoinColumn({
        name: 'MANY_SIDE_APPLICATION_ENTITY_LID',
        referencedColumnName: 'APPLICATION_ENTITY_LID'
    })
    manySideEntity: ApplicationEntity

    @Column({ name: 'MANY_SIDE_ACTOR_RECORD_ID' })
    manySideActorRecordId: number

    @ManyToOne()
    @JoinColumn({
        name: 'MANY_SIDE_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID'
    })
    manySideActor: Actor

    @ManyToOne()
    @JoinColumn({
        name: 'MANY_SIDE_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID'
    })
    manySideRepository: Repository

}
