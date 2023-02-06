import { DdlEntity } from "@airport/airspace/dist/app/bundle";
import { ActorRecordId, ICopiedRecordLedger } from "@airport/ground-control";
import { Column, DbNumber, Entity, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";
import { Actor } from "../../infrastructure/Actor";
import { InternalAirEntity } from "../../infrastructure/InternalAirEntity";
import { Repository } from "../Repository";

@Entity()
@Table({ name: 'COPIED_RECORD_LEDGER' })
export class CopiedRecordLedger
    extends InternalAirEntity
    implements ICopiedRecordLedger {

    @Column({ name: 'COPY_ACTOR_RECORD_ID' })
    @DbNumber()
    copyActorRecordId: ActorRecordId

    @ManyToOne()
    @JoinColumn({
        name: 'COPY_DB_ENTITY_LID',
        referencedColumnName: 'DB_ENTITY_LID',
        nullable: false
    })
    copyAppEntity: DdlEntity

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
