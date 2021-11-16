import { DI } from '@airport/di'
import {
	PropertyId,
	undefinedToNull
} from '@airport/ground-control'
import { SCHEMA_RELATION_DAO } from '../tokens'
import {
	BaseSchemaRelationDao,
	IBaseSchemaRelationDao,
	ISchemaRelation,
	Q,
	QSchemaRelation,
} from '../generated/generated'

export interface ISchemaRelationDao
	extends IBaseSchemaRelationDao {

	findAllForProperties(
		propertyIds: PropertyId[]
	): Promise<ISchemaRelation[]>

	insert(
		schemaRelations: ISchemaRelation[]
	): Promise<void>

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

	async insert(
		schemaRelations: ISchemaRelation[]
	): Promise<void> {
		let sr: QSchemaRelation;
		const values = []
		for (const schemaRelation of schemaRelations) {
			values.push([
				schemaRelation.id, schemaRelation.index,
				schemaRelation.property.id,
				undefinedToNull(schemaRelation.foreignKey),
				undefinedToNull(schemaRelation.manyToOneElems),
				undefinedToNull(schemaRelation.oneToManyElems),
				schemaRelation.relationType, schemaRelation.isId,
				schemaRelation.entity.id, schemaRelation.relationEntity.id,
				schemaRelation.deprecatedSinceVersion ? schemaRelation.deprecatedSinceVersion.id : null,
				schemaRelation.removedInVersion ? schemaRelation.removedInVersion.id : null,
				schemaRelation.sinceVersion ? schemaRelation.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sr = Q.SchemaRelation,
			columns: [
				sr.id,
				sr.index,
				sr.property.id,
				sr.foreignKey,
				sr.manyToOneElems,
				sr.oneToManyElems,
				sr.relationType,
				sr.isId,
				sr.entity.id,
				sr.relationEntity.id,
				sr.deprecatedSinceVersion.id,
				sr.removedInVersion.id,
				sr.sinceVersion.id
			],
			values
		})
	}

}
DI.set(SCHEMA_RELATION_DAO, SchemaRelationDao)
