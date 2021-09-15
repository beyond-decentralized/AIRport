import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QSchema } from './schema/qschema';
import { QSchemaColumn } from './schema/qschemacolumn';
import { QSchemaCurrentVersion } from './schema/qschemacurrentversion';
import { QSchemaEntity } from './schema/qschemaentity';
import { QSchemaOperation } from './schema/qschemaoperation';
import { QSchemaProperty } from './schema/qschemaproperty';
import { QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { QSchemaReference } from './schema/qschemareference';
import { QSchemaRelation } from './schema/qschemarelation';
import { QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { QSchemaVersion } from './schema/qschemaversion';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    Schema: QSchema;
    SchemaColumn: QSchemaColumn;
    SchemaCurrentVersion: QSchemaCurrentVersion;
    SchemaEntity: QSchemaEntity;
    SchemaOperation: QSchemaOperation;
    SchemaProperty: QSchemaProperty;
    SchemaPropertyColumn: QSchemaPropertyColumn;
    SchemaReference: QSchemaReference;
    SchemaRelation: QSchemaRelation;
    SchemaRelationColumn: QSchemaRelationColumn;
    SchemaVersion: QSchemaVersion;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qSchema.d.ts.map