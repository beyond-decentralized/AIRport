import {
    Column,
    Entity,
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

    @Id()
    @Column({ name: 'GUID', nullable: false })
    GUID: string

    @Column({ name: 'IS_ADMINISTRATOR' })
    isAdministrator: boolean

    @Column({ name: 'CAN_WRITE' })
    canWrite: boolean

    @ManyToOne()
    @JoinColumn({
        name: 'USER_ACCOUNT_GUID',
        referencedColumnName: 'GUID',
        nullable: false
    })
    userAccount: UserAccount

    @Column({ name: 'PUBLIC_SIGNING_KEY', nullable: false })
    publicSigningKey: string

    @ManyToOne()
    @JoinColumn({
        name: 'REPOSITORY_GUID',
        referencedColumnName: 'GUID',
        nullable: false
    })
    repository: Repository

}
