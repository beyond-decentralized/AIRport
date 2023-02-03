import { CreatedAt, IRepositoryMemberInvitation, RepositoryMemberInvitation_LocalId, RepositoryMemberInvitation_PublicSigningKey } from "@airport/ground-control";
import {
    Column,
    DbDate,
    DbNumber,
    DbString,
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
@Table({ name: 'REPOSITORY_MEMBER_INVITATIONS' })
export class RepositoryMemberInvitation
    implements IRepositoryMemberInvitation {

    @Id()
    @GeneratedValue()
    @Column({ name: 'REPOSITORY_MEMBER_INVITATION_LID', nullable: false })
    @DbNumber()
    _localId: RepositoryMemberInvitation_LocalId

    @Column({ name: 'CREATED_AT', nullable: false })
    @DbDate()
    createdAt: CreatedAt

    @Column({ name: 'INVITATION_PUBLIC_SIGNING_KEY', nullable: false })
    @DbString()
    invitationPublicSigningKey: RepositoryMemberInvitation_PublicSigningKey

    @ManyToOne()
    @JoinColumn({
        name: 'INVITED_REPOSITORY_MEMBER_LID',
        referencedColumnName: 'REPOSITORY_MEMBER_LID',
        nullable: false
    })
    invitedRepositoryMember: RepositoryMember

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
