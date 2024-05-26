import { AppApiClass, AppApiClass_LocalId, AppApiClass_Name, AppApiOperation, AppApiOperation_Name } from "@airport/ground-control";
import { Column, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, SequenceGenerator, Table, Transient } from "@airport/tarmaq-entity";
import { DdlApplicationVersion } from "../DdlApplicationVersion";
import { ApplicationApiOperation } from "./ApplicationApiOperation";

@Entity()
@Table({ name: 'APPLICATION_API_CLASS' })
export class ApplicationApiClass
    implements AppApiClass {

    @DbNumber()
    @Id()
    @SequenceGenerator({ allocationSize: 100 })
    @Column({
        name: 'APPLICATION_API_CLASS_LID',
        nullable: false
    })
    _localId: AppApiClass_LocalId

    @Column({ name: 'NAME' })
    @DbString()
    name: AppApiClass_Name

    @ManyToOne()
    @JoinColumn({ name: 'DB_APPLICATION_VERSION_LID' })
    applicationVersion: DdlApplicationVersion

    @OneToMany({ mappedBy: 'apiClass' })
    operations: ApplicationApiOperation[]

    @Transient()
    operationMapByName?: { [operationName: AppApiOperation_Name]: AppApiOperation } = {}

}
