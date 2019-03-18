import { QSchemaInternal } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos } from './dao/dao';
import { NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Dmos } from './dmo/dmo';
import { LocalQSchema } from './generated/qSchema';
import { QSchema } from './generated/schema/qschema';
import { QSchemaColumn } from './generated/schema/qschemacolumn';
import { QSchemaEntity } from './generated/schema/qschemaentity';
import { QSchemaProperty } from './generated/schema/qschemaproperty';
import { QSchemaPropertyColumn } from './generated/schema/qschemapropertycolumn';
import { QSchemaReference } from './generated/schema/qschemareference';
import { QSchemaRelation } from './generated/schema/qschemarelation';
import { QSchemaRelationColumn } from './generated/schema/qschemarelationcolumn';
import { QSchemaVersion } from './generated/schema/qschemaversion';
import { QVersionedSchemaObject } from './generated/schema/qversionedschemaobject';
export * from './dao/dao';
export * from './ddl/ddl';
export * from './generated/generated';
export * from './diTokens';
export interface NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSchema extends LocalQSchema {
}
export declare class AtAirport_TrafficPattern_QSchema implements NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSchema, QSchemaInternal {
    db: DbSchema;
    __constructors__: any;
    __created__: any;
    __exported__: any;
    __injected__: any;
    Schema: QSchema;
    SchemaColumn: QSchemaColumn;
    SchemaEntity: QSchemaEntity;
    SchemaProperty: QSchemaProperty;
    SchemaPropertyColumn: QSchemaPropertyColumn;
    SchemaReference: QSchemaReference;
    SchemaRelation: QSchemaRelation;
    SchemaRelationColumn: QSchemaRelationColumn;
    SchemaVersion: QSchemaVersion;
    VersionedSchemaObject: QVersionedSchemaObject;
    dao: NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos;
    dmo: NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Dmos;
    constructor();
    private init;
}
