import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from "@airport/tarmaq-entity";
import { Application } from "./Application";
import { ApplicationVersion } from "./ApplicationVersion";

@Entity()
@Table({
    name: 'APPLICATION_CURRENT_VERSIONS'
})
export class ApplicationCurrentVersion {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'APPLICATION_INDEX', referencedColumnName: 'APPLICATION_INDEX', nullable: false })
    application: Application;

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'APPLICATION_VERSION_LID',
        referencedColumnName: 'APPLICATION_VERSION_LID', nullable: false
    })
    applicationVersion: ApplicationVersion;

}