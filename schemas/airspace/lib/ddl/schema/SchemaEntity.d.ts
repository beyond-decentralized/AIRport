import { TableConfiguration } from '@airport/air-control';
import { EntityId, EntityIsLocal, EntityIsRepositoryEntity, EntityName, TableIndex } from '@airport/ground-control';
import { SchemaColumn } from './SchemaColumn';
import { SchemaOperation } from './SchemaOperation';
import { SchemaProperty } from './SchemaProperty';
import { SchemaRelation } from './SchemaRelation';
import { SchemaVersion } from './SchemaVersion';
import { VersionedSchemaObject } from './VersionedSchemaObject';
import { ISchemaColumn } from '../../generated/schema/schemacolumn';
import { ISchemaProperty } from '../../generated/schema/schemaproperty';
export declare class SchemaEntity extends VersionedSchemaObject {
    id: EntityId;
    index: TableIndex;
    isLocal: EntityIsLocal;
    isRepositoryEntity: EntityIsRepositoryEntity;
    name: EntityName;
    tableConfig: TableConfiguration;
    schemaVersion: SchemaVersion;
    columns: SchemaColumn[];
    operations?: SchemaOperation[];
    properties: SchemaProperty[];
    relations: SchemaRelation[];
    relationReferences: SchemaRelation[];
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
//# sourceMappingURL=SchemaEntity.d.ts.map