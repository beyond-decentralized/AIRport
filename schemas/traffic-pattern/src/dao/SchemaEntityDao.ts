import {DI}                from '@airport/di'
import {SchemaVersionId}   from '@airport/ground-control'
import {
	BaseSchemaEntityDao,
	IBaseSchemaEntityDao,
	ISchemaEntity,
	Q,
	QSchemaEntity,
}                          from '../generated/generated'
import {SCHEMA_ENTITY_DAO} from '../diTokens'

export interface ISchemaEntityDao
	extends IBaseSchemaEntityDao {

	findAllForSchemaVersions(
		schemaVersionIds: SchemaVersionId[]
	): Promise<ISchemaEntity[]>

}

export class SchemaEntityDao
	extends BaseSchemaEntityDao
	implements ISchemaEntityDao {

	async findAllForSchemaVersions(
		schemaVersionIds: SchemaVersionId[]
	): Promise<ISchemaEntity[]> {
		let se: QSchemaEntity

		return await this.db.find.tree({
			select: {},
			from: [
				se = Q.SchemaEntity
			],
			where: se.schemaVersion.id.in(schemaVersionIds)
		})
	}

}

DI.set(SCHEMA_ENTITY_DAO, SchemaEntityDao)
