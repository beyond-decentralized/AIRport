import {DI}                 from '@airport/di'
import {SCHEMA_VERSION_DUO} from '../diTokens'
import {
	BaseSchemaVersionDuo,
	IBaseSchemaVersionDuo
}                           from '../generated/generated'

export interface ISchemaVersionDuo
	extends IBaseSchemaVersionDuo {

}

export class SchemaVersionDuo
	extends BaseSchemaVersionDuo
	implements ISchemaVersionDuo {

}

DI.set(SCHEMA_VERSION_DUO, SchemaVersionDuo)
