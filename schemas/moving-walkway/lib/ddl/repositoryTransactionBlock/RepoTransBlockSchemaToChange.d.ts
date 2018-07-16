import { Schema } from "@airport/traffic-pattern";
import { SchemaChangeStatus } from "../values/SchemaChangeStatus";
import { RepositoryTransactionBlock } from "./RepositoryTransactionBlock";
export declare class RepoTransBlockSchemasToChange {
    repositoryTransactionBlock: RepositoryTransactionBlock;
    status: SchemaChangeStatus;
    schema: Schema;
}
