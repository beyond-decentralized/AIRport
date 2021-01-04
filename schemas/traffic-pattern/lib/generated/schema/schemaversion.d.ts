import { ISchemaEntity } from './schemaentity';
import { ISchemaReference } from './schemareference';
import { ISchema } from './schema';
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
        [entityName: string]: ISchemaEntity;
    };
    referencesMapByName?: {
        [schemaName: string]: ISchemaReference;
    };
    referencedByMapByName?: {
        [schemaName: string]: ISchemaReference;
    };
}
//# sourceMappingURL=schemaversion.d.ts.map