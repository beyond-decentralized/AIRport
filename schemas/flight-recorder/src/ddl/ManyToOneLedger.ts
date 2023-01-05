import { ApplicationEntity } from "@airport/airspace";
import { AirEntity } from "@airport/final-approach";
import { Actor, Repository } from "@airport/holding-pattern";
import { Column, Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'MANY_TO_ONE_LEDGER' })
export class ManyToOneLedger extends AirEntity {

    @ManyToOne()
    @JoinColumn({
        name: 'REFERENCE_APPLICATION_ENTITY_LID',
        referencedColumnName: 'APPLICATION_ENTITY_LID'
    })
    referenceEntity: ApplicationEntity

    @Column({ name: 'REFERENCE_ACTOR_RECORD_ID' })
    referenceActorRecordId: number

    @ManyToOne()
    @JoinColumn({
        name: 'REFERENCE_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID'
    })
    referenceActor: Actor

    @ManyToOne()
    @JoinColumn({
        name: 'SOURCE_APPLICATION_ENTITY_LID',
        referencedColumnName: 'APPLICATION_ENTITY_LID'
    })
    sourceEntity: ApplicationEntity

    @Column({ name: 'SOURCE_ACTOR_RECORD_ID' })
    sourcedActorRecordId: number

    @ManyToOne()
    @JoinColumn({
        name: 'SOURCE_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID'
    })
    sourceActor: Actor

    @ManyToOne()
    @JoinColumn({
        name: 'SOURCE_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID'
    })
    sourceRepository: Repository

}
