import {Service}              from 'typedi'
import {
	BaseSchemaColumnDao,
	IBaseSchemaColumnDao
}                             from '../generated/generated'
import {SchemaColumnDaoToken} from '../InjectionTokens'

export interface ISchemaColumnDao
	extends IBaseSchemaColumnDao {

}

@Service(SchemaColumnDaoToken)
export class SchemaColumnDao
	extends BaseSchemaColumnDao
	implements ISchemaColumnDao {

}