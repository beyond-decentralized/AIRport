import { OR } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import { ApplicationColumn_LocalId, DbRelationColumn } from '@airport/ground-control'
import {
	BaseApplicationRelationColumnDao,
	IBaseApplicationRelationColumnDao,
	QApplicationRelationColumn,
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface IApplicationRelationColumnDao
	extends IBaseApplicationRelationColumnDao {

	findAllForColumns(
		columnIds: ApplicationColumn_LocalId[]
	): Promise<DbRelationColumn[]>

	insert(
		applicationRelationColumns: DbRelationColumn[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationRelationColumnDao
	extends BaseApplicationRelationColumnDao
	implements IApplicationRelationColumnDao {

	async findAllForColumns(
		columnIds: ApplicationColumn_LocalId[]
	): Promise<DbRelationColumn[]> {
		let rc: QApplicationRelationColumn

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				rc = Q.ApplicationRelationColumn
			],
			WHERE: OR(
				rc.oneColumn._localId.IN(columnIds),
				rc.manyColumn._localId.IN(columnIds)
			)
		})
	}

	async insert(
		applicationRelationColumns: DbRelationColumn[],
		context: IContext
	): Promise<void> {
		let src: QApplicationRelationColumn;
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
			INSERT_INTO: src = Q.ApplicationRelationColumn,
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
