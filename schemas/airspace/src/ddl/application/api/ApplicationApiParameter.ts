import { AppApiParameter, AppApiParameter_Index, AppApiParameter_IsRest, AppApiParameter_LocalId, AppApiParameter_Text } from "@airport/ground-control";
import { Column, DbBoolean, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, SequenceGenerator, Table } from "@airport/tarmaq-entity";
import { ApplicationApiOperation } from "./ApplicationApiOperation";

@Entity()
@Table({ name: 'APPLICATION_API_PARAMETER' })
export class ApplicationApiParameter
    implements AppApiParameter {

    @DbNumber()
    @Id()
    @SequenceGenerator({ allocationSize: 100 })
    @Column({
        name: 'APPLICATION_API_PARAMETER_LID',
        nullable: false
    })
    _localId: AppApiParameter_LocalId

    @Column({ name: 'PARAMETER_INDEX' })
    @DbNumber()
    index: AppApiParameter_Index

    @Column({ name: 'IS_REST' })
    @DbBoolean()
    isRest: AppApiParameter_IsRest

    @ManyToOne()
    @JoinColumn({ name: 'APPLICATION_API_OPERATION_LID' })
    operation: ApplicationApiOperation

    @Column({ name: 'TYPE' })
    @DbString()
    text: AppApiParameter_Text

}
