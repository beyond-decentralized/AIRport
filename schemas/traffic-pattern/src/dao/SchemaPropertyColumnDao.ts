import {DI}                         from '@airport/di'
import {ColumnId}                   from '@airport/ground-control'
import {
	BaseSchemaPropertyColumnDao,
	IBaseSchemaPropertyColumnDao,
	ISchemaPropertyColumn,
	Q,
	QSchemaPropertyColumn,
}                                   from '../generated/generated'
import {SCHEMA_PROPERTY_COLUMN_DAO} from '../diTokens'

export interface ISchemaPropertyColumnDao
	extends IBaseSchemaPropertyColumnDao {

	findAllForColumns(
		columnIds: ColumnId[]
	): Promise<ISchemaPropertyColumn[]>

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

}

DI.set(SCHEMA_PROPERTY_COLUMN_DAO, SchemaPropertyColumnDao)
