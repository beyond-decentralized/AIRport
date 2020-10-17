import { TableConfiguration } from '@airport/air-control';
import { EntityId, EntityIsLocal, EntityIsRepositoryEntity, EntityName, TableIndex } from '@airport/ground-control';
import { SchemaColumn } from './SchemaColumn';
import { SchemaOperation } from './SchemaOperation';
import { SchemaProperty } from './SchemaProperty';
import { SchemaRelation } from './SchemaRelation';
import { SchemaVersion } from './SchemaVersion';
import { VersionedSchemaObject } from './VersionedSchemaObject';
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
//# sourceMappingURL=SchemaEntity.d.ts.map