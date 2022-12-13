import {
    Column,
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from "@airport/tarmaq-entity";
import { Repository } from "./Repository";

/**
 * Created by Papa on 2/9/2017.
 */

@Entity()
@Table({
    name: "REPOSITORY_NESTINGS"
})
export class RepositoryNesting {

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'PARENT_REPOSITORY_GUID',
        referencedColumnName: 'GUID',
        nullable: false
    })
    parentRepository: Repository


    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'CHILD_REPOSITORY_GUID',
        referencedColumnName: 'GUID',
        nullable: false
    })
    childRepository: Repository

    @Column({ name: "NESTING_TYPE" })
    nestingType: string


    @Column({ name: "CHILD_REPOSITORY_NAME", nullable: false })
    childRepositoryName: string

}
