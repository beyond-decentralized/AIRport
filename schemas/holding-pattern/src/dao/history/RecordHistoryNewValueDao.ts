import { IContext, Injected } from '@airport/direction-indicator'
import { DbEntity, IRecordHistoryNewValue, RecordHistory_LocalId } from '@airport/ground-control'
import { BaseRecordHistoryNewValueDao, IBaseRecordHistoryNewValueDao } from '../../generated/baseDaos'

import { QOperationHistory, QRecordHistory, QRecordHistoryNewValue, QRepositoryTransactionHistory } from '../../generated/qInterfaces'
import { AND, IQAirEntity, Y } from '@airport/tarmaq-query'
import { QCurrentValueMapping } from '../../generated/query/history/QCurrentValueMapping'

export interface IRecordHistoryNewValueDao
	extends IBaseRecordHistoryNewValueDao {

	findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[],
		context: IContext
	): Promise<IRecordHistoryNewValue[]>

}

@Injected()
export class RecordHistoryNewValueDao
	extends BaseRecordHistoryNewValueDao
	implements IRecordHistoryNewValueDao {

	async findByRecordHistory_LocalIdIn(
		RecordHistory_LocalIds: RecordHistory_LocalId[],
		context: IContext
	): Promise<IRecordHistoryNewValue[]> {
		let rhnv: QRecordHistoryNewValue

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				rhnv = this.qSchema.RecordHistoryNewValue
			],
			WHERE: rhnv.recordHistory._localId.IN(RecordHistory_LocalIds)
		}, context)

	}

	async findOldValues(
		dbEntity: DbEntity,
		qEntity: IQAirEntity,
		whereClause,
		context: IContext
	) {
		const Q = this.qSchema
		let rhnv: QRecordHistoryNewValue
		let rh: QRecordHistory = Q.RecordHistory
		let oh: QOperationHistory = Q.OperationHistory
		let rth: QRepositoryTransactionHistory = Q.RepositoryTransactionHistory
		let cvm: QCurrentValueMapping

		return await this.db.find.tree({
			SELECT: {
				'*': Y,
				recordHistory: {
					_actorRecordId: Y,
					actor: {
						_localId: Y
					},
					operationHistory: {
						repositoryTransactionHistory: {
							repository: {
								_localId: Y
							}
						}
					}
				}
			},
			FROM: [
				qEntity,
				cvm = Q.CurrentValueMapping,
				rhnv = cvm.value.INNER_JOIN(),
				rhnv.INNER_JOIN(rh).ON((rhnvOn, rhOn) => AND(
					rhnvOn.recordHistory._localId.equals(rhOn._localId),
					rhOn._actorRecordId.equals(qEntity._actorRecordId),
					rhOn.actor._localId.equals(qEntity.actor._localId)
				)),
				rh.INNER_JOIN(oh).ON((rhOn, ohOn) => AND(
					rhOn.operationHistory._localId.equals(ohOn._localId),
					ohOn.entity._localId.equals(dbEntity._localId)
				)),
				oh.INNER_JOIN(rth).ON((ohOn, rthOn) => AND(
					ohOn.repositoryTransactionHistory._localId.equals(rthOn._localId),
					rthOn.repository._localId.equals(qEntity.repository._localId)
				))
			],
			WHERE: whereClause
		}, context)
	}

}
