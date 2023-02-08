import { IContext, Inject, Injected } from '@airport/direction-indicator';
import {
	DbEntity_LocalId, DbColumn, IDatastructureUtils
} from '@airport/ground-control'
import { BaseDdlColumnDao, IBaseDdlColumnDao } from '../generated/baseDaos';
import Q_airport____at_airport_slash_airspace from '../generated/qApplication';
import { QDdlColumn } from '../generated/qInterfaces';

export interface IDbColumnDao
	extends IBaseDdlColumnDao {

	findAllForEntities(
		entityIds: DbEntity_LocalId[]
	): Promise<DbColumn[]>;

	insert(
		applicationColumns: DbColumn[],
		context: IContext
	): Promise<void>

}

@Injected()
export class DbColumnDao
	extends BaseDdlColumnDao
	implements IDbColumnDao {

	@Inject()
	datastructureUtils: IDatastructureUtils

	async findAllForEntities(
		entityIds: DbEntity_LocalId[]
	): Promise<DbColumn[]> {
		let c: QDdlColumn

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				c = Q_airport____at_airport_slash_airspace.DdlColumn
			],
			WHERE: c.entity._localId.IN(entityIds)
		})
	}

	async insert(
		applicationColumns: DbColumn[],
		context: IContext
	): Promise<void> {
		let sc: QDdlColumn;
		const VALUES = []
		for (const applicationColumn of applicationColumns) {
			VALUES.push([
				applicationColumn._localId, applicationColumn.index,
				this.datastructureUtils.undefinedToNull(applicationColumn.idIndex),
				applicationColumn.isGenerated,
				this.datastructureUtils.undefinedToNull(applicationColumn.allocationSize),
				applicationColumn.name,
				applicationColumn.notNull,
				this.datastructureUtils.undefinedToNull(applicationColumn.precision),
				this.datastructureUtils.undefinedToNull(applicationColumn.scale),
				applicationColumn.type,
				applicationColumn.entity._localId,
				applicationColumn.deprecatedSinceVersion ? applicationColumn.deprecatedSinceVersion._localId : null,
				applicationColumn.removedInVersion ? applicationColumn.removedInVersion._localId : null,
				applicationColumn.sinceVersion ? applicationColumn.sinceVersion._localId : null,
			])
		}

		await this.db.insertValuesGenerateIds({
			INSERT_INTO: sc = Q_airport____at_airport_slash_airspace.DdlColumn,
			columns: [
				sc._localId,
				sc.index,
				sc.idIndex,
				sc.isGenerated,
				sc.allocationSize,
				sc.name,
				sc.notNull,
				sc.precision,
				sc.scale,
				sc.type,
				sc.entity._localId,
				sc.deprecatedSinceVersion._localId,
				sc.removedInVersion._localId,
				sc.sinceVersion._localId
			],
			VALUES
		}, context)
	}

}
