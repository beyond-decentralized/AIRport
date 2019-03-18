import {DI}                  from '@airport/di'
import {PropertyId}          from '@airport/ground-control'
import {SCHEMA_RELATION_DAO} from '../diTokens'
import {
	BaseSchemaRelationDao,
	IBaseSchemaRelationDao,
	ISchemaRelation,
	Q,
	QSchemaRelation,
}                            from '../generated/generated'

export interface ISchemaRelationDao
	extends IBaseSchemaRelationDao {

	findAllForProperties(
		propertyIds: PropertyId[]
	): Promise<ISchemaRelation[]>

}

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

DI.set(SCHEMA_RELATION_DAO, SchemaRelationDao)
