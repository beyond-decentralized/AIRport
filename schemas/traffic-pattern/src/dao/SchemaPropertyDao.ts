import {EntityId}            from '@airport/ground-control'
import {Service}             from 'typedi'
import {
	BaseSchemaPropertyDao,
	IBaseSchemaPropertyDao,
	ISchemaEntity,
	ISchemaProperty,
	Q,
	QSchemaProperty,
}                            from '../generated/generated'
import {SCHEMA_PROPERTY_DAO} from '../InjectionTokens'

export interface ISchemaPropertyDao
	extends IBaseSchemaPropertyDao {

	findAllForEntities(
		entityIds: EntityId[]
	): Promise<ISchemaProperty[]>;

}

@Service(SCHEMA_PROPERTY_DAO)
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