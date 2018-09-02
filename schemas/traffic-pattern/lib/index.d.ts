import { IAirportDatabase } from '@airport/air-control';
import { DbSchema, IDbSchemaUtils } from '@airport/ground-control';
import { IAtAirport_TrafficPattern_Daos } from './dao/dao';
import { IAtAirport_TrafficPattern_Dmos } from './dmo/dmo';
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
export * from './InjectionTokens';
export interface IAtAirport_TrafficPattern_QSchema extends LocalQSchema {
}
export declare class AtAirport_TrafficPattern_QSchema implements IAtAirport_TrafficPattern_QSchema {
    dao: IAtAirport_TrafficPattern_Daos;
    dmo: IAtAirport_TrafficPattern_Dmos;
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
    constructor(dao: IAtAirport_TrafficPattern_Daos, dmo: IAtAirport_TrafficPattern_Dmos, airportDatabase: IAirportDatabase, dbSchemaUtils: IDbSchemaUtils);
}
