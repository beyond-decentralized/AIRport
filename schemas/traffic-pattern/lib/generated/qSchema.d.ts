import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QSchema } from './schema/qschema';
import { QSchemaColumn } from './schema/qschemacolumn';
import { QSchemaEntity } from './schema/qschemaentity';
import { QSchemaProperty } from './schema/qschemaproperty';
import { QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { QSchemaReference } from './schema/qschemareference';
import { QSchemaRelation } from './schema/qschemarelation';
import { QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { QSchemaVersion } from './schema/qschemaversion';
import { IBaseSchemaDmo, IBaseSchemaColumnDmo, IBaseSchemaEntityDmo, IBaseSchemaPropertyDmo, IBaseSchemaPropertyColumnDmo, IBaseSchemaReferenceDmo, IBaseSchemaRelationDmo, IBaseSchemaRelationColumnDmo, IBaseSchemaVersionDmo } from './baseDmos';
import { IBaseSchemaDao, IBaseSchemaColumnDao, IBaseSchemaEntityDao, IBaseSchemaPropertyDao, IBaseSchemaPropertyColumnDao, IBaseSchemaReferenceDao, IBaseSchemaRelationDao, IBaseSchemaRelationColumnDao, IBaseSchemaVersionDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        Schema: IBaseSchemaDmo;
        SchemaColumn: IBaseSchemaColumnDmo;
        SchemaEntity: IBaseSchemaEntityDmo;
        SchemaProperty: IBaseSchemaPropertyDmo;
        SchemaPropertyColumn: IBaseSchemaPropertyColumnDmo;
        SchemaReference: IBaseSchemaReferenceDmo;
        SchemaRelation: IBaseSchemaRelationDmo;
        SchemaRelationColumn: IBaseSchemaRelationColumnDmo;
        SchemaVersion: IBaseSchemaVersionDmo;
    };
    dao: {
        Schema: IBaseSchemaDao;
        SchemaColumn: IBaseSchemaColumnDao;
        SchemaEntity: IBaseSchemaEntityDao;
        SchemaProperty: IBaseSchemaPropertyDao;
        SchemaPropertyColumn: IBaseSchemaPropertyColumnDao;
        SchemaReference: IBaseSchemaReferenceDao;
        SchemaRelation: IBaseSchemaRelationDao;
        SchemaRelationColumn: IBaseSchemaRelationColumnDao;
        SchemaVersion: IBaseSchemaVersionDao;
    };
    Schema: QSchema;
    SchemaColumn: QSchemaColumn;
    SchemaEntity: QSchemaEntity;
    SchemaProperty: QSchemaProperty;
    SchemaPropertyColumn: QSchemaPropertyColumn;
    SchemaReference: QSchemaReference;
    SchemaRelation: QSchemaRelation;
    SchemaRelationColumn: QSchemaRelationColumn;
    SchemaVersion: QSchemaVersion;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
