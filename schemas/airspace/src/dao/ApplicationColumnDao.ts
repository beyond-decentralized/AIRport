import { IContext, Injected } from '@airport/direction-indicator';
import {
	ApplicationEntity_LocalId,
	undefinedToNull
} from '@airport/ground-control'
import {
	BaseApplicationColumnDao,
	IBaseApplicationColumnDao,
	IApplicationColumn,
	Q,
	QApplicationColumn
} from '../generated/generated'

export interface IApplicationColumnDao
	extends IBaseApplicationColumnDao {

	findAllForEntities(
		entityIds: ApplicationEntity_LocalId[]
	): Promise<IApplicationColumn[]>;

	insert(
		applicationColumns: IApplicationColumn[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationColumnDao
	extends BaseApplicationColumnDao
	implements IApplicationColumnDao {

	async findAllForEntities(
		entityIds: ApplicationEntity_LocalId[]
	): Promise<IApplicationColumn[]> {
		let c: QApplicationColumn

		return this.db.find.tree({
			select: {},
			from: [
				c = Q.ApplicationColumn
			],
			where: c.entity._localId.in(entityIds)
		})
	}

	async insert(
		applicationColumns: IApplicationColumn[],
		context: IContext
	): Promise<void> {
		let sc: QApplicationColumn;
		const values = []
		for (const applicationColumn of applicationColumns) {
			values.push([
				applicationColumn._localId, applicationColumn.index,
				undefinedToNull(applicationColumn.idIndex),
				applicationColumn.isGenerated,
				undefinedToNull(applicationColumn.allocationSize),
				applicationColumn.name,
				applicationColumn.notNull,
				undefinedToNull(applicationColumn.precision),
				undefinedToNull(applicationColumn.scale),
				applicationColumn.type,
				applicationColumn.entity._localId,
				applicationColumn.deprecatedSinceVersion ? applicationColumn.deprecatedSinceVersion._localId : null,
				applicationColumn.removedInVersion ? applicationColumn.removedInVersion._localId : null,
				applicationColumn.sinceVersion ? applicationColumn.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sc = Q.ApplicationColumn,
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
			values
		}, context)
	}

}
