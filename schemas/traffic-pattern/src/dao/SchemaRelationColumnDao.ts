import {or}                         from '@airport/air-control'
import {DI}                         from '@airport/di'
import {ColumnId}                   from '@airport/ground-control'
import {SCHEMA_RELATION_COLUMN_DAO} from '../diTokens'
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

}

DI.set(SCHEMA_RELATION_COLUMN_DAO, SchemaRelationColumnDao)
