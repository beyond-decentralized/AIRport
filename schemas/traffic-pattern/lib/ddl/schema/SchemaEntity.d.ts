import { TableConfiguration } from '@airport/air-control';
import { EntityName, TableIndex } from '@airport/ground-control';
import { ISchemaColumn } from '../../generated/schema/qschemacolumn';
import { ISchemaEntity } from '../../generated/schema/qschemaentity';
import { ISchemaProperty } from '../../generated/schema/qschemaproperty';
import { ISchemaRelation } from '../../generated/schema/qschemarelation';
import { SchemaVersion } from './SchemaVersion';
export declare type SchemaEntityId = number;
export declare class SchemaEntity implements ISchemaEntity {
    id: SchemaEntityId;
    index: TableIndex;
    isLocal: boolean;
    isRepositoryEntity: boolean;
    name: EntityName;
    tableConfig: TableConfiguration;
    schemaVersion: SchemaVersion;
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
    propertyMap: {
        [name: string]: ISchemaProperty;
    };
}
