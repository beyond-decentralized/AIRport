import { TableConfiguration } from '@airport/air-control';
import { EntityName } from '@airport/ground-control';
import { ISchemaColumn } from "../../generated/schema/qschemacolumn";
import { ISchemaEntity } from "../../generated/schema/qschemaentity";
import { ISchemaProperty } from "../../generated/schema/qschemaproperty";
import { ISchemaRelation } from "../../generated/schema/qschemarelation";
import { SchemaVersion } from "./SchemaVersion";
export declare type SchemaEntityIndex = number;
export declare class SchemaEntity implements ISchemaEntity {
    index: SchemaEntityIndex;
    schemaVersion: SchemaVersion;
    isLocal: boolean;
    isRepositoryEntity: boolean;
    name: EntityName;
    tableConfig: TableConfiguration;
    columns: ISchemaColumn[];
    properties: ISchemaProperty[];
    relations: ISchemaRelation[];
    columnMap?: {
        [name: string]: ISchemaColumn;
    };
    idColumns: ISchemaColumn[];
    idColumnMap?: {
        [name: string]: ISchemaColumn;
    };
}
