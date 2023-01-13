import {
    Column,
    DbNumber,
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

export type RepositoryMember_LocalId = number
export type RepopsitoryMember_GUID = string

@Entity()
@Table({ name: 'REPOSITORY_MEMBER' })
export class RepositoryMember {

    @Id()
    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'REPOSITORY_MEMBER_LID', nullable: false })
    localId: RepositoryMember_LocalId

    @Column({ name: 'REPOSITORY_MEMBER_GUID', nullable: false })
    GUID: RepopsitoryMember_GUID

    @Column({ name: 'IS_OWNER', nullable: false })
    isOwner?: boolean = false

    @Column({ name: 'IS_ADMINISTRATOR', nullable: false })
    isAdministrator?: boolean = false

    @Column({ name: 'CAN_WRITE', nullable: false })
    canWrite?: boolean = true

    // Can be null for read-only permissions
    @Column({ name: 'PUBLIC_SIGNING_KEY' })
    publicSigningKey?: string

    @ManyToOne()
    @JoinColumn({
        name: 'USER_ACCOUNT_LID',
        referencedColumnName: 'USER_ACCOUNT_LID',
        nullable: false
    })
    userAccount: UserAccount

    @ManyToOne()
    @JoinColumn({
        name: 'REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID',
        nullable: false
    })
    repository: Repository

}
