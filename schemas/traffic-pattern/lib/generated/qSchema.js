import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { Schema } from '../ddl/schema/schema';
import { SchemaColumn } from '../ddl/schema/schemacolumn';
import { SchemaEntity } from '../ddl/schema/schemaentity';
import { SchemaOperation } from '../ddl/schema/schemaoperation';
import { SchemaProperty } from '../ddl/schema/schemaproperty';
import { SchemaPropertyColumn } from '../ddl/schema/schemapropertycolumn';
import { SchemaReference } from '../ddl/schema/schemareference';
import { SchemaRelation } from '../ddl/schema/schemarelation';
import { SchemaRelationColumn } from '../ddl/schema/schemarelationcolumn';
import { SchemaVersion } from '../ddl/schema/schemaversion';
import { VersionedSchemaObject } from '../ddl/schema/versionedschemaobject';
const __constructors__ = {
    Schema: Schema,
    SchemaColumn: SchemaColumn,
    SchemaEntity: SchemaEntity,
    SchemaOperation: SchemaOperation,
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