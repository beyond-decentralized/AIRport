import { IApplicationCurrentVersion } from "@airport/ground-control";
import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from "@airport/tarmaq-entity";
import { DdlApplication } from "./DdlApplication";
import { DdlApplicationVersion } from "./DdlApplicationVersion";

@Entity()
@Table({
    name: 'DB_APPLICATION_CURRENT_VERSIONS'
})
export class DdlApplicationCurrentVersion
    implements IApplicationCurrentVersion {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'DB_APPLICATION_INDEX', nullable: false })
    application: DdlApplication;

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'DB_APPLICATION_VERSION_LID', nullable: false })
    applicationVersion: DdlApplicationVersion;

}