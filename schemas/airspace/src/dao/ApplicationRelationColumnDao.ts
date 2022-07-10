import { or } from '@airport/tarmaq-query'
import { IContext, Injected } from '@airport/direction-indicator'
import { ApplicationColumn_LocalId } from '@airport/ground-control'
import {
	BaseApplicationRelationColumnDao,
	IBaseApplicationRelationColumnDao,
	IApplicationRelationColumn,
	Q,
	QApplicationRelationColumn,
} from '../generated/generated'

export interface IApplicationRelationColumnDao
	extends IBaseApplicationRelationColumnDao {

	findAllForColumns(
		columnIds: ApplicationColumn_LocalId[]
	): Promise<IApplicationRelationColumn[]>

	insert(
		applicationRelationColumns: IApplicationRelationColumn[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationRelationColumnDao
	extends BaseApplicationRelationColumnDao
	implements IApplicationRelationColumnDao {

	async findAllForColumns(
		columnIds: ApplicationColumn_LocalId[]
	): Promise<IApplicationRelationColumn[]> {
		let rc: QApplicationRelationColumn

		return this.db.find.tree({
			select: {},
			from: [
				rc = Q.ApplicationRelationColumn
			],
			where: or(
				rc.oneColumn._localId.in(columnIds),
				rc.manyColumn._localId.in(columnIds)
			)
		})
	}

	async insert(
		applicationRelationColumns: IApplicationRelationColumn[],
		context: IContext
	): Promise<void> {
		let src: QApplicationRelationColumn;
		const values = []
		for (const applicationRelationColumn of applicationRelationColumns) {
			values.push([
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
			insertInto: src = Q.ApplicationRelationColumn,
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
			values
		}, context)
	}

}
