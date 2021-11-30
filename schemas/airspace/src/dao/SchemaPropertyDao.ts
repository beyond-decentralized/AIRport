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

	insert(
		schemaProperties: ISchemaProperty[]
	): Promise<void>

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
	
	async insert(
		schemaProperties: ISchemaProperty[]
	): Promise<void> {
		let sp: QSchemaProperty;
		const values = []
		for (const schemaProperty of schemaProperties) {
			values.push([
				schemaProperty.id, schemaProperty.index,
				schemaProperty.name, schemaProperty.isId,
				schemaProperty.entity.id,
				schemaProperty.deprecatedSinceVersion ? schemaProperty.deprecatedSinceVersion.id : null,
				schemaProperty.removedInVersion ? schemaProperty.removedInVersion.id : null,
				schemaProperty.sinceVersion ? schemaProperty.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sp = Q.SchemaProperty,
			columns: [
				sp.id,
				sp.index,
				sp.name,
				sp.isId,
				sp.entity.id,
				sp.deprecatedSinceVersion.id,
				sp.removedInVersion.id,
				sp.sinceVersion.id
			],
			values
		})
	}

}

DI.set(SCHEMA_PROPERTY_DAO, SchemaPropertyDao)
