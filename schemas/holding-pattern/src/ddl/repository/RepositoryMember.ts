import { RepositoryMember_CanWrite, RepositoryMember_GUID, RepositoryMember_IsAdministrator, RepositoryMember_IsOwner, RepositoryMember_LocalId, RepositoryMember_PublicSigningKey, RepositoryMember_Status } from "@airport/ground-control";
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
    Table
} from "@airport/tarmaq-entity";
import {
    UserAccount
} from "@airport/travel-document-checkpoint/dist/app/bundle";
import { Repository } from "./Repository";

@Entity()
@Table({ name: 'REPOSITORY_MEMBER' })
export class RepositoryMember {

    @Column({ name: 'REPOSITORY_MEMBER_LID', nullable: false })
    @GeneratedValue()
    @Id()
    @DbNumber()
    _localId: RepositoryMember_LocalId;

    @Column({ name: 'REPOSITORY_MEMBER_GUID', nullable: false })
    @DbString()
    GUID?: RepositoryMember_GUID

    @Column({ name: 'IS_OWNER', nullable: false })
    @DbBoolean()
    isOwner?: RepositoryMember_IsOwner

    @Column({ name: 'IS_ADMINISTRATOR', nullable: false })
    @DbBoolean()
    isAdministrator?: RepositoryMember_IsAdministrator

    @Column({ name: 'CAN_WRITE', nullable: false })
    @DbBoolean()
    canWrite?: RepositoryMember_CanWrite

    // Can be null for read-only permissions
    @Column({ name: 'PUBLIC_SIGNING_KEY' })
    @DbString()
    publicSigningKey?: RepositoryMember_PublicSigningKey

    @Column({ name: 'STATUS', nullable: false })
    @DbNumber()
    status?: RepositoryMember_Status

    @ManyToOne()
    @JoinColumn({
        name: 'REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID'
    })
    repository?: Repository

    @ManyToOne()
    @JoinColumn({
        name: 'USER_ACCOUNT_LID',
        referencedColumnName: 'USER_ACCOUNT_LID'
    })
    userAccount?: UserAccount

}
