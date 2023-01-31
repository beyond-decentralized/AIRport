import { IContext, Injected } from '@airport/direction-indicator'
import { DbColumn_LocalId, DbPropertyColumn } from '@airport/ground-control'
import {
	BaseDdlPropertyColumnDao,
	IBaseDdlPropertyColumnDao,
	QDdlPropertyColumn,
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface IApplicationPropertyColumnDao
	extends IBaseDdlPropertyColumnDao {

	findAllForColumns(
		columnIds: DbColumn_LocalId[]
	): Promise<DbPropertyColumn[]>

	insert(
		applicationPropertyColumns: DbPropertyColumn[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationPropertyColumnDao
	extends BaseDdlPropertyColumnDao
	implements IApplicationPropertyColumnDao {


	async findAllForColumns(
		columnIds: DbColumn_LocalId[]
	): Promise<DbPropertyColumn[]> {
		let rc: QDdlPropertyColumn

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				rc = Q.ApplicationPropertyColumn
			],
			WHERE: rc.column._localId.IN(columnIds)
		})
	}

	async insert(
		applicationPropertyColumns: DbPropertyColumn[],
		context: IContext
	): Promise<void> {
		let spc: QDdlPropertyColumn;
		const VALUES = []
		for (const applicationPropertyColumn of applicationPropertyColumns) {
			VALUES.push([
				applicationPropertyColumn.column._localId, applicationPropertyColumn.property._localId,
				applicationPropertyColumn.deprecatedSinceVersion ? applicationPropertyColumn.deprecatedSinceVersion._localId : null,
				applicationPropertyColumn.removedInVersion ? applicationPropertyColumn.removedInVersion._localId : null,
				applicationPropertyColumn.sinceVersion ? applicationPropertyColumn.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: spc = Q.ApplicationPropertyColumn,
			columns: [
				spc.column._localId,
				spc.property._localId,
				spc.deprecatedSinceVersion._localId,
				spc.removedInVersion._localId,
				spc.sinceVersion._localId
			],
			VALUES
		}, context)
	}

}
