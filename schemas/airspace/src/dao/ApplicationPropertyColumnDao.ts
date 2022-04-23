import {DEPENDENCY_INJECTION}                         from '@airport/direction-indicator'
import {ColumnId}                   from '@airport/ground-control'
import {
	BaseApplicationPropertyColumnDao,
	IBaseApplicationPropertyColumnDao,
	IApplicationPropertyColumn,
	Q,
	QApplicationPropertyColumn,
}                                   from '../generated/generated'
import {APPLICATION_PROPERTY_COLUMN_DAO} from '../tokens'

export interface IApplicationPropertyColumnDao
	extends IBaseApplicationPropertyColumnDao {

	findAllForColumns(
		columnIds: ColumnId[]
	): Promise<IApplicationPropertyColumn[]>

	insert(
		applicationPropertyColumns: IApplicationPropertyColumn[]
	): Promise<void>

}

export class ApplicationPropertyColumnDao
	extends BaseApplicationPropertyColumnDao
	implements IApplicationPropertyColumnDao {


	async findAllForColumns(
		columnIds: ColumnId[]
	): Promise<IApplicationPropertyColumn[]> {
		let rc: QApplicationPropertyColumn

		return this.db.find.tree({
			select: {},
			from: [
				rc = Q.ApplicationPropertyColumn
			],
			where: rc.column.id.in(columnIds)
		})
	}
	
	async insert(
		applicationPropertyColumns: IApplicationPropertyColumn[]
	): Promise<void> {
		let spc: QApplicationPropertyColumn;
		const values = []
		for (const applicationPropertyColumn of applicationPropertyColumns) {
			values.push([
				applicationPropertyColumn.column.id, applicationPropertyColumn.property.id,
				applicationPropertyColumn.deprecatedSinceVersion ? applicationPropertyColumn.deprecatedSinceVersion.id : null,
				applicationPropertyColumn.removedInVersion ? applicationPropertyColumn.removedInVersion.id : null,
				applicationPropertyColumn.sinceVersion ? applicationPropertyColumn.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: spc = Q.ApplicationPropertyColumn,
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

DEPENDENCY_INJECTION.set(APPLICATION_PROPERTY_COLUMN_DAO, ApplicationPropertyColumnDao)
