import {DI}                  from '@airport/di'
import {EntityId}            from '@airport/ground-control'
import {SCHEMA_PROPERTY_DAO} from '../tokens'
import {
	BaseSchemaPropertyDao,
	IBaseSchemaPropertyDao,
	ISchemaProperty,
	Q,
	QSchemaProperty,
}                            from '../generated/generated'

export interface ISchemaPropertyDao
	extends IBaseSchemaPropertyDao {

	findAllForEntities(
		entityIds: EntityId[]
	): Promise<ISchemaProperty[]>;

}

export class SchemaPropertyDao
	extends BaseSchemaPropertyDao
	implements ISchemaPropertyDao {

	async findAllForEntities(
		entityIds: EntityId[]
	): Promise<ISchemaProperty[]> {
		let p: QSchemaProperty

		return this.db.find.tree({
			select: {},
			from: [
				p = Q.SchemaProperty
			],
			where: p.entity.id.in(entityIds)
		})
	}

}

DI.set(SCHEMA_PROPERTY_DAO, SchemaPropertyDao)
