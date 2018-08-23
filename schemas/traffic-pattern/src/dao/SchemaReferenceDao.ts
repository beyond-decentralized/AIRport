import {Service}                 from 'typedi'
import {
	BaseSchemaReferenceDao,
	IBaseSchemaReferenceDao,
}                                from '../generated/generated'
import {SchemaReferenceDaoToken} from '../InjectionTokens'

export interface ISchemaReferenceDao
	extends IBaseSchemaReferenceDao {

}

@Service(SchemaReferenceDaoToken)
export class SchemaReferenceDao
	extends BaseSchemaReferenceDao
	implements ISchemaReferenceDao {

}