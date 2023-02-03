import { CreatedAt, IRepositoryMemberUpdate, RepositoryMember_CanWrite, RepositoryMember_IsAdministrator, RepositoryMember_LocalId, RepositoryTransactionHistory_SyncTimestamp } from "@airport/ground-control";
import {
    Column,
    DbBoolean,
    DbNumber,
    Entity,
    GeneratedValue,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from "@airport/tarmaq-entity";
import { RepositoryTransactionHistory } from "../../history/RepositoryTransactionHistory";
import { RepositoryMember } from "./RepositoryMember";

@Entity()
@Table({ name: 'REPOSITORY_MEMBER_UPDATES' })
export class RepositoryMemberUpdate
    implements IRepositoryMemberUpdate {

    @Id()
    @GeneratedValue()
    @Column({ name: 'REPOSITORY_MEMBER_UPDATE_LID', nullable: false })
    @DbNumber()
    _localId: RepositoryMember_LocalId

    @Column({ name: 'CREATED_AT', nullable: false })
    @DbNumber()
    createdAt: CreatedAt

    @Column({ name: 'IS_ADMINISTRATOR' })
    @DbBoolean()
    isAdministrator?: RepositoryMember_IsAdministrator

    @Column({ name: 'CAN_WRITE' })
    @DbBoolean()
    canWrite?: RepositoryMember_CanWrite

    @ManyToOne()
    @JoinColumn({
        name: 'UPDATED_REPOSITORY_MEMBER_LID',
        referencedColumnName: 'REPOSITORY_MEMBER_LID',
        nullable: false
    })
    updatedRepositoryMember: RepositoryMember

    // Only populated in the database of the terminal
    // where the RepositoryTransactionHistory was originally
    // created (for the purpose of being able to reconstruct
    // and re-send the RepositoryTransactionHistory)
    @ManyToOne()
    @JoinColumn({
        name: 'REPOSITORY_TRANSACTION_HISTORY_LID',
        referencedColumnName: 'REPOSITORY_TRANSACTION_HISTORY_LID'
    })
    addedInRepositoryTransactionHistory?: RepositoryTransactionHistory

}
