import { RepositoryMember_CanWrite, RepositoryMember_IsAdministrator, RepositoryMember_LocalId, RepositoryTransactionHistory_SyncTimestamp } from "@airport/ground-control";
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
import { RepositoryMember } from "./RepositoryMember";

@Entity()
@Table({ name: 'REPOSITORY_MEMBER_UPDATES' })
export class RepositoryMemberUpdate {

    @Id()
    @GeneratedValue()
    @Column({ name: 'REPOSITORY_MEMBER_UPDATE_LID', nullable: false })
    @DbNumber()
    _localId: RepositoryMember_LocalId

    @Column({ name: 'SYNC_TIMESTAMP', nullable: false })
    @DbNumber()
    syncTimestamp?: RepositoryTransactionHistory_SyncTimestamp

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'REPOSITORY_MEMBER_LID',
        referencedColumnName: 'REPOSITORY_MEMBER_LID',
        nullable: false
    })
    repositoryMember?: RepositoryMember

    @Column({ name: 'IS_ADMINISTRATOR', nullable: false })
    @DbBoolean()
    isAdministrator?: RepositoryMember_IsAdministrator

    @Column({ name: 'CAN_WRITE', nullable: false })
    @DbBoolean()
    canWrite?: RepositoryMember_CanWrite

}
