import {DI}                 from '@airport/di'
import {SCHEMA_VERSION_DMO} from '../diTokens'
import {
	BaseSchemaVersionDmo,
	IBaseSchemaVersionDmo
}                           from '../generated/generated'

export interface ISchemaVersionDmo
	extends IBaseSchemaVersionDmo {

}

export class SchemaVersionDmo
	extends BaseSchemaVersionDmo
	implements ISchemaVersionDmo {

}

DI.set(SCHEMA_VERSION_DMO, SchemaVersionDmo)