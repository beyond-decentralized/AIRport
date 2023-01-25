import { IRepositoryMember, RepositoryMember_CanWrite, RepositoryMember_IsAdministrator, RepositoryMember_IsOwner, RepositoryMember_LocalId, RepositoryMember_PublicSigningKey, RepositoryMember_Status } from "@airport/ground-control";
import {
    Column,
    DbBoolean,
    DbNumber,
    DbString,
    Entity,
    GeneratedValue,
    Id,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Table
} from "@airport/tarmaq-entity";
import {
    UserAccount
} from "@airport/travel-document-checkpoint/dist/app/bundle";
import { RepositoryTransactionHistory } from "../../history/RepositoryTransactionHistory";
import { Repository } from "../Repository";
import { RepositoryMemberAcceptance } from "./RepositoryMemberAcceptance";
import { RepositoryMemberInvitation } from "./RepositoryMemberInvitation";
import { RepositoryMemberUpdate } from "./RepositoryMemberUpdate";

@Entity()
@Table({ name: 'REPOSITORY_MEMBERS' })
export class RepositoryMember
    implements IRepositoryMember {

    @Id()
    @GeneratedValue()
    @Column({ name: 'REPOSITORY_MEMBER_LID', nullable: false })
    @DbNumber()
    _localId: RepositoryMember_LocalId;

    // doubles as the GUID property
    // Is null when the user is first invited into the Repository
    // but hasn't accepted the invitation yet
    @Column({ name: 'MEMBER_PUBLIC_SIGNING_KEY' })
    @DbString()
    memberPublicSigningKey?: RepositoryMember_PublicSigningKey

    @Column({ name: 'IS_OWNER', nullable: false })
    @DbBoolean()
    isOwner?: RepositoryMember_IsOwner

    @Column({ name: 'IS_ADMINISTRATOR', nullable: false })
    @DbBoolean()
    isAdministrator?: RepositoryMember_IsAdministrator

    @Column({ name: 'CAN_WRITE', nullable: false })
    @DbBoolean()
    canWrite?: RepositoryMember_CanWrite

    @Column({ name: 'STATUS', nullable: false })
    @DbNumber()
    status?: RepositoryMember_Status

    @ManyToOne()
    @JoinColumn({
        name: 'REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    repository?: Repository

    // When the member is first invited to the repository
    // there is no UserAccount associated with it
    @ManyToOne()
    @JoinColumn({
        name: 'USER_ACCOUNT_LID',
        referencedColumnName: 'USER_ACCOUNT_LID'
    })
    userAccount?: UserAccount

    // Only populated in the database of the Terminal
    // where the RepositoryTransactionHistory was originally
    // created (for the purpose of being able to reconstruct
    // and re-send the RepositoryTransactionHistory)
    @ManyToOne()
    @JoinColumn({
        name: 'REPOSITORY_TRANSACTION_HISTORY_LID',
        referencedColumnName: 'REPOSITORY_TRANSACTION_HISTORY_LID'
    })
    addedInRepositoryTransactionHistory?: RepositoryTransactionHistory

    @OneToMany({ mappedBy: 'repositoryMember' })
    acceptances?: RepositoryMemberAcceptance[]

    @OneToMany({ mappedBy: 'repositoryMember' })
    invitations?: RepositoryMemberInvitation[]

    @OneToMany({ mappedBy: 'repositoryMember' })
    updates?: RepositoryMemberUpdate[] = []

}
