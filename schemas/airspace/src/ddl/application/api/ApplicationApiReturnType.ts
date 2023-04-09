import { AppApiReturnType, AppApiReturnType_IsArray, AppApiReturnType_LocalId, AppApiReturnType_Type } from "@airport/ground-control";
import { Column, DbBoolean, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, SequenceGenerator, Table } from "@airport/tarmaq-entity";
import { ApplicationApiOperation } from "./ApplicationApiOperation";

@Entity()
@Table({ name: 'APPLICATION_API_RETURN_TYPE' })
export class ApplicationApiReturnType
    implements AppApiReturnType {

    @DbNumber()
    @Id()
    @SequenceGenerator({ allocationSize: 100 })
    @Column({
        name: 'APPLICATION_API_RETURN_TYPE_LID',
        nullable: false
    })
    _localId: AppApiReturnType_LocalId

    @Column({ name: 'IS_ARRAY' })
    @DbBoolean()
    isArray: AppApiReturnType_IsArray

    @ManyToOne()
    @JoinColumn({
        name: 'APPLICATION_API_OPERATION_LID',
        referencedColumnName: 'APPLICATION_API_OPERATION_LID'
    })
    operation: ApplicationApiOperation

    @Column({ name: 'TYPE' })
    @DbString()
    type: AppApiReturnType_Type

}
