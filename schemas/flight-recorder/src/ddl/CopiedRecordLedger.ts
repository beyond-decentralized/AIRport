import { ApplicationEntity } from "@airport/airspace";
import { Actor, InternalAirEntity, Repository } from "@airport/holding-pattern/dist/app/bundle";
import { Column, Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";

@Entity()
@Table({ name: 'COPIED_RECORD_LEDGER' })
export class CopiedRecordLedger
    extends InternalAirEntity {

    @ManyToOne()
    @JoinColumn({
        name: 'COPY_APPLICATION_ENTITY_LID',
        referencedColumnName: 'APPLICATION_ENTITY_LID',
        nullable: false
    })
    copyAppEntity: ApplicationEntity

    @Column({ name: 'COPY_ACTOR_RECORD_ID' })
    copyActorRecordId: number

    @ManyToOne()
    @JoinColumn({
        name: 'COPY_ACTOR_LID',
        referencedColumnName: 'ACTOR_LID',
        nullable: false
    })
    copyActor: Actor

    @ManyToOne()
    @JoinColumn({
        name: 'COPY_REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    copyRepository: Repository

}
