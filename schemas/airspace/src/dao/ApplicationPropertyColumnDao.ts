import { IContext, Injected } from '@airport/direction-indicator'
import { ApplicationColumn_LocalId } from '@airport/ground-control'
import {
	BaseApplicationPropertyColumnDao,
	IBaseApplicationPropertyColumnDao,
	IApplicationPropertyColumn,
	Q,
	QApplicationPropertyColumn,
} from '../generated/generated'

export interface IApplicationPropertyColumnDao
	extends IBaseApplicationPropertyColumnDao {

	findAllForColumns(
		columnIds: ApplicationColumn_LocalId[]
	): Promise<IApplicationPropertyColumn[]>

	insert(
		applicationPropertyColumns: IApplicationPropertyColumn[],
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationPropertyColumnDao
	extends BaseApplicationPropertyColumnDao
	implements IApplicationPropertyColumnDao {


	async findAllForColumns(
		columnIds: ApplicationColumn_LocalId[]
	): Promise<IApplicationPropertyColumn[]> {
		let rc: QApplicationPropertyColumn

		return this.db.find.tree({
			select: {},
			from: [
				rc = Q.ApplicationPropertyColumn
			],
			where: rc.column._localId.in(columnIds)
		})
	}

	async insert(
		applicationPropertyColumns: IApplicationPropertyColumn[],
		context: IContext
	): Promise<void> {
		let spc: QApplicationPropertyColumn;
		const values = []
		for (const applicationPropertyColumn of applicationPropertyColumns) {
			values.push([
				applicationPropertyColumn.column._localId, applicationPropertyColumn.property._localId,
				applicationPropertyColumn.deprecatedSinceVersion ? applicationPropertyColumn.deprecatedSinceVersion._localId : null,
				applicationPropertyColumn.removedInVersion ? applicationPropertyColumn.removedInVersion._localId : null,
				applicationPropertyColumn.sinceVersion ? applicationPropertyColumn.sinceVersion._localId : null,
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: spc = Q.ApplicationPropertyColumn,
			columns: [
				spc.column._localId,
				spc.property._localId,
				spc.deprecatedSinceVersion._localId,
				spc.removedInVersion._localId,
				spc.sinceVersion._localId
			],
			values
		}, context)
	}

}
