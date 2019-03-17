import {or}                         from '@airport/air-control'
import {ColumnId}                   from '@airport/ground-control'
import {Service}                    from 'typedi'
import {
	BaseSchemaPropertyColumnDao,
	IBaseSchemaPropertyColumnDao,
	ISchemaPropertyColumn,
	Q,
	QSchemaPropertyColumn,
}                                   from '../generated/generated'
import {SCHEMA_PROPERTY_COLUMN_DAO} from '../InjectionTokens'

export interface ISchemaPropertyColumnDao
	extends IBaseSchemaPropertyColumnDao {

	findAllForColumns(
		columnIds: ColumnId[]
	): Promise<ISchemaPropertyColumn[]>

}

@Service(SCHEMA_PROPERTY_COLUMN_DAO)
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