import { system } from '@airport/di';
import { IDomainDao } from './dao/DomainDao'
import { ISchemaColumnDao } from './dao/SchemaColumnDao';
import { ISchemaDao } from './dao/SchemaDao';
import { ISchemaEntityDao } from './dao/SchemaEntityDao';
import { ISchemaPropertyColumnDao } from './dao/SchemaPropertyColumnDao';
import { ISchemaPropertyDao } from './dao/SchemaPropertyDao';
import { ISchemaReferenceDao } from './dao/SchemaReferenceDao';
import { ISchemaRelationColumnDao } from './dao/SchemaRelationColumnDao';
import { ISchemaRelationDao } from './dao/SchemaRelationDao';
import { ISchemaVersionDao } from './dao/SchemaVersionDao';
import { ISchemaVersionDuo } from './duo/SchemaVersionDuo';

const trafficPattern = system('airport').lib('traffic-pattern');

export const DOMAIN_DAO = trafficPattern.token<IDomainDao>('IDomainDao')
export const SCHEMA_COLUMN_DAO = trafficPattern.token<ISchemaColumnDao>('ISchemaColumnDao');
export const SCHEMA_DAO = trafficPattern.token<ISchemaDao>('ISchemaDao');
export const SCHEMA_ENTITY_DAO = trafficPattern.token<ISchemaEntityDao>('ISchemaEntityDao');
export const SCHEMA_PROPERTY_COLUMN_DAO = trafficPattern.token<ISchemaPropertyColumnDao>('ISchemaPropertyColumnDao');
export const SCHEMA_PROPERTY_DAO = trafficPattern.token<ISchemaPropertyDao>('ISchemaPropertyDao');
export const SCHEMA_REFERENCE_DAO = trafficPattern.token<ISchemaReferenceDao>('ISchemaReferenceDao');
export const SCHEMA_RELATION_COLUMN_DAO = trafficPattern.token<ISchemaRelationColumnDao>('ISchemaRelationColumnDao');
export const SCHEMA_RELATION_DAO = trafficPattern.token<ISchemaRelationDao>('ISchemaRelationDao');
export const SCHEMA_VERSION_DAO = trafficPattern.token<ISchemaVersionDao>('ISchemaVersionDao');
export const SCHEMA_VERSION_DUO = trafficPattern.token<ISchemaVersionDuo>('ISchemaVersionDuo');
