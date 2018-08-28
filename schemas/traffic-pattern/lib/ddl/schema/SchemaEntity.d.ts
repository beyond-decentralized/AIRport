import { TableConfiguration } from '@airport/air-control';
import { EntityName, TableIndex } from '@airport/ground-control';
import { SchemaColumn } from './SchemaColumn';
import { SchemaProperty } from './SchemaProperty';
import { SchemaRelation } from './SchemaRelation';
import { SchemaVersion } from './SchemaVersion';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare type SchemaEntityId = number;
export declare class SchemaEntity extends VersionedSchemaObject {
    id: SchemaEntityId;
    index: TableIndex;
    isLocal: boolean;
    isRepositoryEntity: boolean;
    name: EntityName;
    tableConfig: TableConfiguration;
    schemaVersion: SchemaVersion;
    columns: SchemaColumn[];
    properties: SchemaProperty[];
    relations: SchemaRelation[];
    relationReferences: SchemaRelation[];
    columnMap?: {
        [name: string]: SchemaColumn;
    };
    idColumns: SchemaColumn[];
    idColumnMap?: {
        [name: string]: SchemaColumn;
    };
    propertyMap: {
        [name: string]: SchemaProperty;
    };
}
