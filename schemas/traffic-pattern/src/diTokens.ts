import {diToken}                                  from '@airport/di'
import {NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos} from './dao/dao'
import {ISchemaColumnDao}                         from './dao/SchemaColumnDao'
import {ISchemaDao}                               from './dao/SchemaDao'
import {ISchemaEntityDao}                         from './dao/SchemaEntityDao'
import {ISchemaPropertyColumnDao}                 from './dao/SchemaPropertyColumnDao'
import {ISchemaPropertyDao}                       from './dao/SchemaPropertyDao'
import {ISchemaReferenceDao}                      from './dao/SchemaReferenceDao'
import {ISchemaRelationColumnDao}                 from './dao/SchemaRelationColumnDao'
import {ISchemaRelationDao}                       from './dao/SchemaRelationDao'
import {ISchemaVersionDao}                        from './dao/SchemaVersionDao'
import {NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Duos} from './duo/duo'
import {ISchemaVersionDuo}                        from './duo/SchemaVersionDuo'

export const NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA
	                                      = 'NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_QSCHEMA'
export const NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DAOS
	                                      = diToken<NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Daos>()
export const NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_DUOS
	                                      = diToken<NPMJS_ORG___AIRPORT_TRAFFIC_PATTERN_Duos>()
export const SCHEMA_COLUMN_DAO          = diToken<ISchemaColumnDao>()
export const SCHEMA_DAO                 = diToken<ISchemaDao>()
export const SCHEMA_ENTITY_DAO          = diToken<ISchemaEntityDao>()
export const SCHEMA_PROPERTY_COLUMN_DAO = diToken<ISchemaPropertyColumnDao>()
export const SCHEMA_PROPERTY_DAO        = diToken<ISchemaPropertyDao>()
export const SCHEMA_REFERENCE_DAO       = diToken<ISchemaReferenceDao>()
export const SCHEMA_RELATION_COLUMN_DAO = diToken<ISchemaRelationColumnDao>()
export const SCHEMA_RELATION_DAO        = diToken<ISchemaRelationDao>()
export const SCHEMA_VERSION_DAO         = diToken<ISchemaVersionDao>()
export const SCHEMA_VERSION_DUO         = diToken<ISchemaVersionDuo>()
