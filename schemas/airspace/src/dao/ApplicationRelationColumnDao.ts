import { or } from '@airport/air-traffic-control'
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
				rc.oneColumn.id.in(columnIds),
				rc.manyColumn.id.in(columnIds)
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
				applicationRelationColumn.id,
				applicationRelationColumn.manyColumn ? applicationRelationColumn.manyColumn.id : null,
				applicationRelationColumn.oneColumn ? applicationRelationColumn.oneColumn.id : null,
				applicationRelationColumn.manyRelation ? applicationRelationColumn.manyRelation.id : null,
				applicationRelationColumn.oneRelation ? applicationRelationColumn.oneRelation.id : null,
				applicationRelationColumn.parentRelation ? applicationRelationColumn.parentRelation.id : null,
				applicationRelationColumn.deprecatedSinceVersion ? applicationRelationColumn.deprecatedSinceVersion.id : null,
				applicationRelationColumn.removedInVersion ? applicationRelationColumn.removedInVersion.id : null,
				applicationRelationColumn.sinceVersion ? applicationRelationColumn.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: src = Q.ApplicationRelationColumn,
			columns: [
				src.id,
				src.manyColumn.id,
				src.oneColumn.id,
				src.manyRelation.id,
				src.oneRelation.id,
				src.parentRelation.id,
				src.deprecatedSinceVersion.id,
				src.removedInVersion.id,
				src.sinceVersion.id
			],
			values
		}, context)
	}

}
