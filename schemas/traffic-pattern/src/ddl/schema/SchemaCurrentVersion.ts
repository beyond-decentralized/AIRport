import {
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    Table
} from "@airport/air-control";
import { Schema } from "./Schema";
import { SchemaVersion } from "./SchemaVersion";

@Entity()
@Table({
    name: 'SCHEMA_CURRENT_VERSIONS'
})
export class SchemaCurrentVersion {

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'SCHEMA_INDEX', referencedColumnName: 'SCHEMA_INDEX', nullable: false })
    schema: Schema;

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false })
    schemaVersion: SchemaVersion;

}