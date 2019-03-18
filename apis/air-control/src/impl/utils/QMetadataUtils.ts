import {DI}                      from '@airport/di/lib'
import {
	DbEntity,
	JSONBaseOperation
}                                from '@airport/ground-control'
import {
	AIRPORT_DATABASE,
	Q_METADATA_UTILS,
	UTILS
}                                from '../../diTokens'
import {IAirportDatabase}        from '../../lingo/AirportDatabase'
import {IQEntityInternal}        from '../../lingo/core/entity/Entity'
import {IQOperableFieldInternal} from '../../lingo/core/field/OperableField'
import {IQMetadataUtils}         from '../../lingo/utils/QMetadataUtils'
import {IUtils}                  from '../../lingo/utils/Utils'

export class QMetadataUtils
	implements IQMetadataUtils {

	private airportDb: IAirportDatabase
	private utils: IUtils

	constructor() {
		DI.get(
			(
				airportDb,
				utils
			) => {
				this.airportDb = airportDb
				this.utils     = utils
			}, AIRPORT_DATABASE, UTILS)
	}

	getAllColumns(
		qEntity: IQEntityInternal
	): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] {
		return qEntity.__driver__.allColumns
	}

	getDbEntity<IQE extends IQEntityInternal>(
		qEntity: IQE
	): DbEntity {
		return qEntity.__driver__.dbEntity
	}

	getNewEntity(qEntity: IQEntityInternal): any {
		const dbEntity          = qEntity.__driver__.dbEntity
		const entityConstructor = this.airportDb.qSchemas[dbEntity.schemaVersion.schema.index].__constructors__[dbEntity.name]
		return new entityConstructor()
	}

}

DI.set(Q_METADATA_UTILS, QMetadataUtils)
