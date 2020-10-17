import { IVersionedSchemaObject } from './versionedschemaobject';
import { Operation_Rule } from '@airport/ground-control';
import { ISchemaEntity } from './schemaentity';
export interface ISchemaOperation extends IVersionedSchemaObject {
    id: number;
    type?: number;
    name?: string;
    rule?: Operation_Rule;
    entity?: ISchemaEntity;
}
//# sourceMappingURL=schemaoperation.d.ts.map