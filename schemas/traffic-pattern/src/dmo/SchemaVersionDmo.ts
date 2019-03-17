import {Service}            from 'typedi'
import {
	BaseSchemaVersionDmo,
	IBaseSchemaVersionDmo
}                           from '../generated/generated'
import {SCHEMA_VERSION_DMO} from '../InjectionTokens'

export interface ISchemaVersionDmo
	extends IBaseSchemaVersionDmo {

}

@Service(SCHEMA_VERSION_DMO)
export class SchemaVersionDmo
	extends BaseSchemaVersionDmo
	implements ISchemaVersionDmo {

}