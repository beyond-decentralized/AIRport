import { SchemaIndex } from "@airport/ground-control";
import { Domain } from "@airport/territory";
import { ISchema } from "../../generated/schema/qschema";
import { SchemaStatus } from "./SchemaStatus";
import { SchemaVersion } from "./SchemaVersion";
export declare type SchemaScope = 'private' | 'public' | null;
export declare type SchemaName = string;
export declare class Schema implements ISchema {
    index: SchemaIndex;
    domain: Domain;
    scope: SchemaScope;
    name: SchemaName;
    status: SchemaStatus;
    versions: SchemaVersion[];
    currentVersion: SchemaVersion;
}
