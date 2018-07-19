import { SchemaIndex } from "@airport/ground-control";
import { IRepository } from "../../generated/repository/qrepository";
import { IRepositorySchema } from "../../generated/repository/qrepositoryschema";
export declare type RepositorySchemaId = number;
export declare class RepositorySchema implements IRepositorySchema {
    id: RepositorySchemaId;
    repository: IRepository;
    schemaIndex: SchemaIndex;
}
