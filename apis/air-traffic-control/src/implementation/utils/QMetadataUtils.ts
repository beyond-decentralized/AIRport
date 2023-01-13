import { Inject, Injected } from '@airport/direction-indicator'
import {
	DbEntity,
	Dictionary,
	JSONBaseOperation,
} from '@airport/ground-control'
import { IQEntityInternal, IQOperableFieldInternal } from '@airport/tarmaq-query'
import { IAirportDatabase } from '../../definition/AirportDatabase'
import { IQMetadataUtils } from '../../definition/utils/IQMetadataUtils'

@Injected()
export class QMetadataUtils
	implements IQMetadataUtils {

	@Inject()
	dictionary: Dictionary

	getAllColumns(
		qEntity: IQEntityInternal
	): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] {
		return qEntity.__driver__.allColumns
	}

	getAllNonGeneratedColumns(
		qEntity: IQEntityInternal
	): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] {
		return this.getAllColumns(qEntity).filter(qField => !qField.dbColumn.isGenerated)
	}

	getAllInsertableColumns(
		qEntity: IQEntityInternal
	): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] {
		return this.getAllColumns(qEntity).filter(qField => {
			if (qField.dbColumn.isGenerated) {
				return false
			}
			if (qEntity.__driver__.dbEntity.isAirEntity) {
				switch (qField.dbColumn.name) {
					case this.dictionary.AirEntity.columns.SYSTEM_WIDE_OPERATION_LID:
						return false
				}
			}
			return true
		})
	}

	getDbEntity<IQE extends IQEntityInternal>(
		qEntity: IQE
	): DbEntity {
		return qEntity.__driver__.dbEntity
	}

	getNewEntity(
		qEntity: IQEntityInternal,
		airDb: IAirportDatabase
	): any {
		const dbEntity = qEntity.__driver__.dbEntity
		const entityConstructor = airDb.qApplications[dbEntity.applicationVersion.application.index].__constructors__[dbEntity.name]
		if (!entityConstructor) {
			return {}
		}
		return new entityConstructor()
	}

}
