import {Service}              from 'typedi'
import {
	BaseSchemaEntityDao,
	IBaseSchemaEntityDao,
}                             from '../generated/generated'
import {SchemaEntityDaoToken} from '../InjectionTokens'

export interface ISchemaEntityDao
extends IBaseSchemaEntityDao {

}

@Service(SchemaEntityDaoToken)
export class SchemaEntityDao
	extends BaseSchemaEntityDao
	implements ISchemaEntityDao {

}