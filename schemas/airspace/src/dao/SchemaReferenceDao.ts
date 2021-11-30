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

	insert(
		schemaReferences: ISchemaReference[]
	): Promise<void>

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

	async insert(
		schemaReferences: ISchemaReference[]
	): Promise<void> {
		let sr: QSchemaReference;
		const values = []
		for (const schemaReference of schemaReferences) {
			values.push([
				schemaReference.ownSchemaVersion.id, 
				schemaReference.referencedSchemaVersion.id,
				schemaReference.index,
				schemaReference.deprecatedSinceVersion ? schemaReference.deprecatedSinceVersion.id : null,
				schemaReference.removedInVersion ? schemaReference.removedInVersion.id : null,
				schemaReference.sinceVersion ? schemaReference.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sr = Q.SchemaReference,
			columns: [
				sr.ownSchemaVersion.id,
				sr.referencedSchemaVersion.id,
				sr.index,
				sr.deprecatedSinceVersion.id,
				sr.removedInVersion.id,
				sr.sinceVersion.id
			],
			values
		})
	}

}

DI.set(SCHEMA_REFERENCE_DAO, SchemaReferenceDao)
