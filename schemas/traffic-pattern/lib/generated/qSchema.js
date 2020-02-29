import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { Schema } from '../ddl/schema/Schema';
import { SchemaColumn } from '../ddl/schema/SchemaColumn';
import { SchemaEntity } from '../ddl/schema/SchemaEntity';
import { SchemaProperty } from '../ddl/schema/SchemaProperty';
import { SchemaPropertyColumn } from '../ddl/schema/SchemaPropertyColumn';
import { SchemaReference } from '../ddl/schema/SchemaReference';
import { SchemaRelation } from '../ddl/schema/SchemaRelation';
import { SchemaRelationColumn } from '../ddl/schema/SchemaRelationColumn';
import { SchemaVersion } from '../ddl/schema/SchemaVersion';
import { VersionedSchemaObject } from '../ddl/schema/VersionedSchemaObject';
const __constructors__ = {
    Schema: Schema,
    SchemaColumn: SchemaColumn,
    SchemaEntity: SchemaEntity,
    SchemaProperty: SchemaProperty,
    SchemaPropertyColumn: SchemaPropertyColumn,
    SchemaReference: SchemaReference,
    SchemaRelation: SchemaRelation,
    SchemaRelationColumn: SchemaRelationColumn,
    SchemaVersion: SchemaVersion,
    VersionedSchemaObject: VersionedSchemaObject
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/traffic-pattern'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbSchema__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbSchema__, dbEntityId);
}
DI.db().get(AIR_DB).then((airDb) => {
    airDb.QM[getSchemaName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map