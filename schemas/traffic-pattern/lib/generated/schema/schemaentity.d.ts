import { IVersionedSchemaObject } from './versionedschemaobject';
import { TableConfiguration } from '@airport/air-control';
import { ISchemaColumn } from './schemacolumn';
import { ISchemaProperty } from './schemaproperty';
import { ISchemaVersion } from './schemaversion';
import { ISchemaOperation } from './schemaoperation';
import { ISchemaRelation } from './schemarelation';
export interface ISchemaEntity extends IVersionedSchemaObject {
    id: number;
    index?: number;
    isLocal?: boolean;
    isRepositoryEntity?: boolean;
    name?: string;
    tableConfig?: TableConfiguration;
    schemaVersion?: ISchemaVersion;
    columns?: ISchemaColumn[];
    operations?: ISchemaOperation[];
    properties?: ISchemaProperty[];
    relations?: ISchemaRelation[];
    relationReferences?: ISchemaRelation[];
    columnMap?: {
        [name: string]: ISchemaColumn;
    };
    idColumns?: ISchemaColumn[];
    idColumnMap?: {
        [name: string]: ISchemaColumn;
    };
    propertyMap?: {
        [name: string]: ISchemaProperty;
    };
}
//# sourceMappingURL=schemaentity.d.ts.map