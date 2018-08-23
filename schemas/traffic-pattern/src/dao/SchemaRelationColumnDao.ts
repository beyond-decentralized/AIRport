import {Service}                      from 'typedi'
import {
	BaseSchemaRelationColumnDao,
	IBaseSchemaRelationColumnDao,
}                                     from '../generated/generated'
import {SchemaRelationColumnDaoToken} from '../InjectionTokens'

export interface ISchemaRelationColumnDao
	extends IBaseSchemaRelationColumnDao {

}

@Service(SchemaRelationColumnDaoToken)
export class SchemaRelationColumnDao
	extends BaseSchemaRelationColumnDao
	implements ISchemaRelationColumnDao {

}