import { IContext, Inject, Injected } from '@airport/direction-indicator';
import {
	ApplicationEntity_LocalId, IDatastructureUtils
} from '@airport/ground-control'
import {
	BaseApplicationColumnDao,
	IBaseApplicationColumnDao,
	IApplicationColumn,
	QApplicationColumn
} from '../generated/generated'
import Q from '../generated/qApplication'

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

	@Inject()
	datastructureUtils: IDatastructureUtils

	async findAllForEntities(
		entityIds: ApplicationEntity_LocalId[]
	): Promise<IApplicationColumn[]> {
		let c: QApplicationColumn

		return this.db.find.tree({
			SELECT: {},
			FROM: [
				c = Q.ApplicationColumn
			],
			WHERE: c.entity._localId.IN(entityIds)
		})
	}

	async insert(
		applicationColumns: IApplicationColumn[],
		context: IContext
	): Promise<void> {
		let sc: QApplicationColumn;
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
			INSERT_INTO: sc = Q.ApplicationColumn,
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
