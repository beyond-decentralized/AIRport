import {DI}                         from '@airport/di'
import {ColumnId}                   from '@airport/ground-control'
import {
	BaseSchemaPropertyColumnDao,
	IBaseSchemaPropertyColumnDao,
	ISchemaPropertyColumn,
	Q,
	QSchemaPropertyColumn,
}                                   from '../generated/generated'
import {SCHEMA_PROPERTY_COLUMN_DAO} from '../tokens'

export interface ISchemaPropertyColumnDao
	extends IBaseSchemaPropertyColumnDao {

	findAllForColumns(
		columnIds: ColumnId[]
	): Promise<ISchemaPropertyColumn[]>

	insert(
		schemaPropertyColumns: ISchemaPropertyColumn[]
	): Promise<void>

}

export class SchemaPropertyColumnDao
	extends BaseSchemaPropertyColumnDao
	implements ISchemaPropertyColumnDao {


	async findAllForColumns(
		columnIds: ColumnId[]
	): Promise<ISchemaPropertyColumn[]> {
		let rc: QSchemaPropertyColumn

		return this.db.find.tree({
			select: {},
			from: [
				rc = Q.SchemaPropertyColumn
			],
			where: rc.column.id.in(columnIds)
		})
	}
	
	async insert(
		schemaPropertyColumns: ISchemaPropertyColumn[]
	): Promise<void> {
		let spc: QSchemaPropertyColumn;
		const values = []
		for (const schemaPropertyColumn of schemaPropertyColumns) {
			values.push([
				schemaPropertyColumn.column.id, schemaPropertyColumn.property.id,
				schemaPropertyColumn.deprecatedSinceVersion ? schemaPropertyColumn.deprecatedSinceVersion.id : null,
				schemaPropertyColumn.removedInVersion ? schemaPropertyColumn.removedInVersion.id : null,
				schemaPropertyColumn.sinceVersion ? schemaPropertyColumn.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: spc = Q.SchemaPropertyColumn,
			columns: [
				spc.column.id,
				spc.property.id,
				spc.deprecatedSinceVersion.id,
				spc.removedInVersion.id,
				spc.sinceVersion.id
			],
			values
		})
	}

}

DI.set(SCHEMA_PROPERTY_COLUMN_DAO, SchemaPropertyColumnDao)
