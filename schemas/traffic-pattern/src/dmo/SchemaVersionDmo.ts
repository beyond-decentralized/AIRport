import {Service}               from 'typedi'
import {
	BaseSchemaVersionDmo,
	IBaseSchemaVersionDmo
}                              from '../generated/generated'
import {SchemaVersionDmoToken} from '../InjectionTokens'

export interface ISchemaVersionDmo
	extends IBaseSchemaVersionDmo {

}

@Service(SchemaVersionDmoToken)
export class SchemaVersionDmo
	extends BaseSchemaVersionDmo
	implements ISchemaVersionDmo {

}