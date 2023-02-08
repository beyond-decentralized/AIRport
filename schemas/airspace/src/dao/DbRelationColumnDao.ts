import { OR } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import { DbColumn_LocalId, DbRelationColumn } from '@airport/ground-control'
import { BaseDdlRelationColumnDao, IBaseDdlRelationColumnDao } from '../generated/baseDaos'
import { QDdlRelationColumn } from '../generated/qInterfaces'
import Q_airport____at_airport_slash_airspace from '../generated/qApplication'

export interface IDbRelationColumnDao
	extends IBaseDdlRelationColumnDao {

	findAllForColumns(
		columnIds: DbColumn_LocalId[],
		context: IContext
	): Promise<DbRelationColumn[]>

	insert(
		applicationRelationColumns: DbRelationColumn[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DbRelationColumnDao
	extends BaseDdlRelationColumnDao
	implements IDbRelationColumnDao {

	async findAllForColumns(
		columnIds: DbColumn_LocalId[],
		context: IContext
	): Promise<DbRelationColumn[]> {
		let rc: QDdlRelationColumn

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				rc = Q_airport____at_airport_slash_airspace.DbRelationColumn
			],
			WHERE: OR(
				rc.oneColumn._localId.IN(columnIds),
				rc.manyColumn._localId.IN(columnIds)
			)
		}, context)
	}

	async insert(
		applicationRelationColumns: DbRelationColumn[],
		context: IContext
	): Promise<void> {
		let src: QDdlRelationColumn;
		const VALUES = []
		for (const applicationRelationColumn of applicationRelationColumns) {
			VALUES.push([
				applicationRelationColumn._localId,
				applicationRelationColumn.manyColumn ? applicationRelationColumn.manyColumn._localId : null,
				applicationRelationColumn.oneColumn ? applicationRelationColumn.oneColumn._localId : null,
				applicationRelationColumn.manyRelation ? applicationRelationColumn.manyRelation._localId : null,
				applicationRelationColumn.oneRelation ? applicationRelationColumn.oneRelation._localId : null,
				applicationRelationColumn.parentRelation ? applicationRelationColumn.parentRelation._localId : null,
				applicationRelationColumn.deprecatedSinceVersion ? applicationRelationColumn.deprecatedSinceVersion._localId : null,
				applicationRelationColumn.removedInVersion ? applicationRelationColumn.removedInVersion._localId : null,
				applicationRelationColumn.sinceVersion ? applicationRelationColumn.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			INSERT_INTO: src = Q_airport____at_airport_slash_airspace.DbRelationColumn,
			columns: [
				src._localId,
				src.manyColumn._localId,
				src.oneColumn._localId,
				src.manyRelation._localId,
				src.oneRelation._localId,
				src.parentRelation._localId,
				src.deprecatedSinceVersion._localId,
				src.removedInVersion._localId,
				src.sinceVersion._localId
			],
			VALUES
		}, context)
	}

}
