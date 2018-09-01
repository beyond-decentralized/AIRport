import {SchemaVersionId}      from '@airport/ground-control'
import {Service}              from 'typedi'
import {
	BaseSchemaEntityDao,
	IBaseSchemaEntityDao,
	ISchemaEntity,
	ISchemaReference,
	Q,
	QSchemaEntity,
	QSchemaReference,
} from '../generated/generated'
import {SchemaEntityDaoToken} from '../InjectionTokens'

export interface ISchemaEntityDao
extends IBaseSchemaEntityDao {

	findAllForSchemaVersions(
		schemaVersionIds: SchemaVersionId[]
	): Promise<ISchemaEntity[]>

}

@Service(SchemaEntityDaoToken)
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