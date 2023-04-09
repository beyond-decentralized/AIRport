import { AppApiOperation, AppApiOperation_IsAsync, AppApiOperation_LocalId, AppApiOperation_Name } from "@airport/ground-control";
import { Column, DbBoolean, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, SequenceGenerator, Table } from "@airport/tarmaq-entity";
import { ApplicationApiClass } from "./ApplicationApiClass";
import { ApplicationApiParameter } from "./ApplicationApiParameter";
import { ApplicationApiReturnType } from "./ApplicationApiReturnType";

@Entity()
@Table({ name: 'APPLICATION_API_OPERATION' })
export class ApplicationApiOperation
    implements AppApiOperation {

    @DbNumber()
    @Id()
    @SequenceGenerator({ allocationSize: 100 })
    @Column({
        name: 'APPLICATION_API_OPERATION_LID',
        nullable: false
    })
    _localId: AppApiOperation_LocalId

    @Column({ name: 'IS_ASYNC' })
    @DbBoolean()
    isAsync: AppApiOperation_IsAsync

    @Column({ name: 'NAME' })
    @DbString()
    name: AppApiOperation_Name

    @ManyToOne()
    @JoinColumn({
        name: 'APPLICATION_API_CLASS_LID',
        referencedColumnName: 'APPLICATION_API_CLASS_LID'
    })
    apiClass: ApplicationApiClass

    @OneToMany({ mappedBy: 'operation' })
    parameters: ApplicationApiParameter[]

    @OneToMany({ mappedBy: 'operation' })
    returnType: ApplicationApiReturnType[]

}
