import {DI}                   from '@airport/di'
import {SchemaVersionId}      from '@airport/ground-control'
import {SCHEMA_REFERENCE_DAO} from '../tokens'
import {
	BaseSchemaReferenceDao,
	IBaseSchemaReferenceDao,
	ISchemaReference,
	Q,
	QSchemaReference,
}                             from '../generated/generated'

export interface ISchemaReferenceDao
	extends IBaseSchemaReferenceDao {

	findAllForSchemaVersions(
		schemaVersionIds: SchemaVersionId[]
	): Promise<ISchemaReference[]>

}

export class SchemaReferenceDao
	extends BaseSchemaReferenceDao
	implements ISchemaReferenceDao {

	async findAllForSchemaVersions(
		schemaVersionIds: SchemaVersionId[]
	): Promise<ISchemaReference[]> {
		let sr: QSchemaReference

		return await this.db.find.tree({
			select: {},
			from: [
				sr = Q.SchemaReference
			],
			where: sr.ownSchemaVersion.id.in(schemaVersionIds)
		})
	}

}

DI.set(SCHEMA_REFERENCE_DAO, SchemaReferenceDao)
