import {PropertyId}             from '@airport/ground-control'
import {Service}                from 'typedi'
import {
	BaseSchemaRelationDao,
	IBaseSchemaRelationDao,
	ISchemaRelation,
	Q,
	QSchemaRelation,
}                               from '../generated/generated'
import {SchemaRelationDaoToken} from '../InjectionTokens'

export interface ISchemaRelationDao
	extends IBaseSchemaRelationDao {

	findAllForProperties(
		propertyIds: PropertyId[]
	): Promise<ISchemaRelation[]>

}

@Service(SchemaRelationDaoToken)
export class SchemaRelationDao
	extends BaseSchemaRelationDao
	implements ISchemaRelationDao {

	async findAllForProperties(
		propertyIds: PropertyId[]
	): Promise<ISchemaRelation[]> {
		let r: QSchemaRelation

		return this.db.find.tree({
			select: {},
			from: [
				r = Q.SchemaRelation
			],
			where: r.property.id.in(propertyIds)
		})
	}

}