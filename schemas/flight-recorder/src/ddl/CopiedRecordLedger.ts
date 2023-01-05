import { ApplicationEntity } from "@airport/airspace";
import { AirEntity } from "@airport/final-approach";
import { Actor, Repository } from "@airport/holding-pattern/dist/app/bundle";
import { Column, Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'COPIED_RECORD_LEDGER' })
export class CopiedRecordLedger extends AirEntity {

    @ManyToOne()
    @JoinColumn({
        name: 'COPY_APPLICATION_ENTITY_LID',
        referencedColumnName: 'APPLICATION_ENTITY_LID'
    })
    copyEntity: ApplicationEntity

    @Column({ name: 'COPY_ACTOR_RECORD_ID' })
    copyActorRecordId: number

    @ManyToOne()
    @JoinColumn({
        name: 'COPY_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID'
    })
    copyActor: Actor

    @ManyToOne()
    @JoinColumn({
        name: 'COPY_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID'
    })
    copyRepository: Repository

    replaced: boolean

}
