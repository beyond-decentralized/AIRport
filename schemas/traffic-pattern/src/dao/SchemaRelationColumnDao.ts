import {or}                           from '@airport/air-control'
import {ColumnId}                     from '@airport/ground-control'
import {Service}                      from 'typedi'
import {
	BaseSchemaRelationColumnDao,
	IBaseSchemaRelationColumnDao,
	ISchemaRelationColumn,
	Q,
	QSchemaRelationColumn,
}                                     from '../generated/generated'
import {SchemaRelationColumnDaoToken} from '../InjectionTokens'

export interface ISchemaRelationColumnDao
	extends IBaseSchemaRelationColumnDao {

	findAllForColumns(
		columnIds: ColumnId[]
	): Promise<ISchemaRelationColumn[]>

}

@Service(SchemaRelationColumnDaoToken)
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