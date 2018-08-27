import {SchemaVersionId}         from '@airport/ground-control'
import {Service}                 from 'typedi'
import {
	BaseSchemaReferenceDao,
	IBaseSchemaReferenceDao,
	ISchemaReference,
	Q,
	QSchemaReference,
} from '../generated/generated'
import {SchemaReferenceDaoToken} from '../InjectionTokens'

export interface ISchemaReferenceDao
	extends IBaseSchemaReferenceDao {

	findAllForSchemaVersions(
		schemaVersionIds: SchemaVersionId[]
	): Promise<ISchemaReference[]>

}

@Service(SchemaReferenceDaoToken)
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