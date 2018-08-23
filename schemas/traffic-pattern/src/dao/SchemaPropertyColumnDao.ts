import {Service}                      from 'typedi'
import {
	BaseSchemaPropertyColumnDao,
	IBaseSchemaPropertyColumnDao,
}                                     from '../generated/generated'
import {SchemaPropertyColumnDaoToken} from '../InjectionTokens'

export interface ISchemaPropertyColumnDao
	extends IBaseSchemaPropertyColumnDao {

}

@Service(SchemaPropertyColumnDaoToken)
export class SchemaPropertyColumnDao
	extends BaseSchemaPropertyColumnDao
	implements ISchemaPropertyColumnDao {

}