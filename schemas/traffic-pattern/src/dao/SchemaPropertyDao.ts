import {Service}                from 'typedi'
import {
	BaseSchemaPropertyDao,
	IBaseSchemaPropertyDao,
}                               from '../generated/generated'
import {SchemaPropertyDaoToken} from '../InjectionTokens'

export interface ISchemaPropertyDao
extends IBaseSchemaPropertyDao {

}

@Service(SchemaPropertyDaoToken)
export class SchemaPropertyDao
	extends BaseSchemaPropertyDao
	implements ISchemaPropertyDao {

}