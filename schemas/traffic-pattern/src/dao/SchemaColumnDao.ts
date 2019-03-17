import {EntityId}          from '@airport/ground-control'
import {Service}           from 'typedi'
import {
	BaseSchemaColumnDao,
	IBaseSchemaColumnDao,
	ISchemaColumn,
	Q,
	QSchemaColumn
}                          from '../generated/generated'
import {SCHEMA_COLUMN_DAO} from '../InjectionTokens'

export interface ISchemaColumnDao
	extends IBaseSchemaColumnDao {

	findAllForEntities(
		entityIds: EntityId[]
	): Promise<ISchemaColumn[]>;

}

@Service(SCHEMA_COLUMN_DAO)
export class SchemaColumnDao
	extends BaseSchemaColumnDao
	implements ISchemaColumnDao {

	async findAllForEntities(
		entityIds: EntityId[]
	): Promise<ISchemaColumn[]> {
		let c: QSchemaColumn

		return this.db.find.tree({
			select: {},
			from: [
				c = Q.SchemaColumn
			],
			where: c.entity.id.in(entityIds)
		})
	}

}