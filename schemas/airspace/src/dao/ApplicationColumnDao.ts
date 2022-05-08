import { IContext, Injected } from '@airport/direction-indicator';
import {
	EntityId,
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
		entityIds: EntityId[]
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
		entityIds: EntityId[]
	): Promise<IApplicationColumn[]> {
		let c: QApplicationColumn

		return this.db.find.tree({
			select: {},
			from: [
				c = Q.ApplicationColumn
			],
			where: c.entity.id.in(entityIds)
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
				applicationColumn.id, applicationColumn.index,
				undefinedToNull(applicationColumn.idIndex),
				applicationColumn.isGenerated,
				undefinedToNull(applicationColumn.allocationSize),
				applicationColumn.name,
				applicationColumn.notNull,
				undefinedToNull(applicationColumn.precision),
				undefinedToNull(applicationColumn.scale),
				applicationColumn.type,
				applicationColumn.entity.id,
				applicationColumn.deprecatedSinceVersion ? applicationColumn.deprecatedSinceVersion.id : null,
				applicationColumn.removedInVersion ? applicationColumn.removedInVersion.id : null,
				applicationColumn.sinceVersion ? applicationColumn.sinceVersion.id : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: sc = Q.ApplicationColumn,
			columns: [
				sc.id,
				sc.index,
				sc.idIndex,
				sc.isGenerated,
				sc.allocationSize,
				sc.name,
				sc.notNull,
				sc.precision,
				sc.scale,
				sc.type,
				sc.entity.id,
				sc.deprecatedSinceVersion.id,
				sc.removedInVersion.id,
				sc.sinceVersion.id
			],
			values
		}, context)
	}

}
