import {or}                         from '@airport/air-control'
import {DI}                         from '@airport/di'
import {ColumnId}                   from '@airport/ground-control'
import {SCHEMA_RELATION_COLUMN_DAO} from '../tokens'
import {
	BaseSchemaRelationColumnDao,
	IBaseSchemaRelationColumnDao,
	ISchemaRelationColumn,
	Q,
	QSchemaRelationColumn,
}                                   from '../generated/generated'

export interface ISchemaRelationColumnDao
	extends IBaseSchemaRelationColumnDao {

	findAllForColumns(
		columnIds: ColumnId[]
	): Promise<ISchemaRelationColumn[]>

	insert(
		schemaRelationColumns: ISchemaRelationColumn[]
	): Promise<void>

}

export class SchemaRelationColumnDao
	extends BaseSchemaRelationColumnDao
	implements ISchemaRelationColumnDao {

	async findAllForColumns(
		columnIds: ColumnId[]
	): Promise<ISchemaRelationColumn[]> {
		let rc: QSchemaRelationColumn

		return this.db.find.tree({
			select: {},
			from: [
				rc = Q.SchemaRelationColumn
			],
			where: or(
				rc.oneColumn.id.in(columnIds),
				rc.manyColumn.id.in(columnIds)
			)
		})
	}
	
	async insert(
		schemaRelationColumns: ISchemaRelationColumn[]
	): Promise<void> {
		let src: QSchemaRelationColumn;
		const values = []
		for (const schemaRelationColumn of schemaRelationColumns) {
			values.push([
				schemaRelationColumn.id,
				schemaRelationColumn.manyColumn ? schemaRelationColumn.manyColumn.id: null,
				schemaRelationColumn.oneColumn ? schemaRelationColumn.oneColumn.id : null,
				schemaRelationColumn.manyRelation ? schemaRelationColumn.manyRelation.id: null,
				schemaRelationColumn.oneRelation ? schemaRelationColumn.oneRelation.id : null,
				schemaRelationColumn.parentRelation ? schemaRelationColumn.parentRelation.id : null,
				schemaRelationColumn.deprecatedSinceVersion ? schemaRelationColumn.deprecatedSinceVersion.id : null,
				schemaRelationColumn.removedInVersion ? schemaRelationColumn.removedInVersion.id : null,
				schemaRelationColumn.sinceVersion ? schemaRelationColumn.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: src = Q.SchemaRelationColumn,
			columns: [
				src.id,
				src.manyColumn.id,
				src.oneColumn.id,
				src.manyRelation.id,
				src.oneRelation.id,
				src.parentRelation.id,
				src.deprecatedSinceVersion.id,
				src.removedInVersion.id,
				src.sinceVersion.id
			],
			values
		})
	}

}

DI.set(SCHEMA_RELATION_COLUMN_DAO, SchemaRelationColumnDao)
