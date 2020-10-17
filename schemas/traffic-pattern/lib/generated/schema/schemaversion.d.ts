import { SchemaEntity } from '../../ddl/schema/SchemaEntity';
import { SchemaReference } from '../../ddl/schema/SchemaReference';
import { ISchema } from './schema';
import { ISchemaEntity } from './schemaentity';
import { ISchemaReference } from './schemareference';
export interface ISchemaVersion {
    id: number;
    integerVersion?: number;
    versionString?: string;
    majorVersion?: number;
    minorVersion?: number;
    patchVersion?: number;
    schema?: ISchema;
    entities?: ISchemaEntity[];
    references?: ISchemaReference[];
    referencedBy?: ISchemaReference[];
    entityMapByName?: {
        [entityName: string]: SchemaEntity;
    };
    referencesMapByName?: {
        [schemaName: string]: SchemaReference;
    };
    referencedByMapByName?: {
        [schemaName: string]: SchemaReference;
    };
}
//# sourceMappingURL=schemaversion.d.ts.map