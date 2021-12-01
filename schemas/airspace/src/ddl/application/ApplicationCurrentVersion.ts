import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from "@airport/air-control";
import { Application } from "./Application";
import { ApplicationVersion } from "./ApplicationVersion";

@Entity()
@Table({
    name: 'SCHEMA_CURRENT_VERSIONS'
})
export class ApplicationCurrentVersion {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'SCHEMA_INDEX', referencedColumnName: 'SCHEMA_INDEX', nullable: false })
    application: Application;

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false })
    applicationVersion: ApplicationVersion;

}