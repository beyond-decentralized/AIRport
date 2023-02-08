import { IContext, Injected } from '@airport/direction-indicator'
import { DbColumn_LocalId, DbPropertyColumn } from '@airport/ground-control'
import { BaseDdlPropertyColumnDao, IBaseDdlPropertyColumnDao } from '../generated/baseDaos'
import Q_airport____at_airport_slash_airspace from '../generated/qApplication'
import { QDdlPropertyColumn } from '../generated/qInterfaces'

export interface IDbPropertyColumnDao
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
export class DbPropertyColumnDao
	extends BaseDdlPropertyColumnDao
	implements IDbPropertyColumnDao {


	async findAllForColumns(
		columnIds: DbColumn_LocalId[]
	): Promise<DbPropertyColumn[]> {
		let rc: QDdlPropertyColumn
		
		return this.db.find.tree({
			SELECT: {},
			FROM: [
				rc = Q_airport____at_airport_slash_airspace.ApplicationPropertyColumn
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
			INSERT_INTO: spc = Q_airport____at_airport_slash_airspace.ApplicationPropertyColumn,
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
