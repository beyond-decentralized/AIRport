import { system } from '@airport/di'
import { IRelationManager } from './impl/core/entity/RelationManager'
import { IQueryContextLoader } from './impl/query/QueryContext'
import { IAirportDatabase } from './lingo/AirportDatabase'
import {
	IDatabaseFacade,
	IQueryFacade
} from './lingo/core/repository/DatabaseFacade'
import { ILookup } from './lingo/query/api/Lookup'
import { IEntityUtils } from './lingo/utils/EntityUtils'
import { IFieldUtils } from './lingo/utils/FieldUtils'
import { IQMetadataUtils } from './lingo/utils/QMetadataUtils'
import { IQueryUtils } from './lingo/utils/QueryUtils'
import { ISchemaUtils } from './lingo/utils/SchemaUtils'

const airControl = system('airport')
	.lib('air-control')

export const AIRPORT_DATABASE = airControl.token<IAirportDatabase>('IAirportDatabase')
export const DATABASE_FACADE = airControl.token<IDatabaseFacade>('IDatabaseFacade')
export const LOOKUP = airControl.token<ILookup>('ILookup')
export const ENTITY_UTILS = airControl.token<IEntityUtils>('IEntityUtils')
export const FIELD_UTILS = airControl.token<IFieldUtils>('IFieldUtils')
export const Q_METADATA_UTILS = airControl.token<IQMetadataUtils>('IQMetadataUtils')
export const QUERY_CONTEXT_LOADER = airControl.token<IQueryContextLoader>('IQueryContextLoader')
export const QUERY_FACADE = airControl.token<IQueryFacade>('IQueryFacade')
export const QUERY_UTILS = airControl.token<IQueryUtils>('IQueryUtils')
export const RELATION_MANAGER = airControl.token<IRelationManager>('IRelationManager')
export const SCHEMA_UTILS = airControl.token<ISchemaUtils>('ISchemaUtils')

