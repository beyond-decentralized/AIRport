import {Service}                from 'typedi'
import {
	BaseSchemaRelationDao,
	IBaseSchemaRelationDao,
}                               from '../generated/generated'
import {SchemaRelationDaoToken} from '../InjectionTokens'

export interface ISchemaRelationDao
	extends IBaseSchemaRelationDao {

}

@Service(SchemaRelationDaoToken)
export class SchemaRelationDao
	extends BaseSchemaRelationDao
	implements ISchemaRelationDao {

}