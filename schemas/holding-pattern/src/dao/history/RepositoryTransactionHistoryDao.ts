import {
	ALL_FIELDS,
	AND,
	OR,
	Y
} from '@airport/tarmaq-query'
import {
	ApplicationEntity_LocalId,
	IDatastructureUtils,
	JSONBaseOperation,
	TransactionType
} from '@airport/ground-control'
import {
	Actor_LocalId,
	OperationHistory,
	RecordHistory_ActorRecordId,
} from '../../ddl/ddl'
import {
	BaseRepositoryTransactionHistoryDao,
	IRepositoryTransactionHistory,
	QOperationHistory,
	QRecordHistory,
	QRecordHistoryNewValue,
	QRepositoryTransactionHistory,
	QTransactionHistory,
} from '../../generated/generated'
import Q from '../../generated/qApplication'
import { QApplicationEntity, QApplicationVersion } from '@airport/airspace/dist/app/bundle'
import { Inject, Injected } from '@airport/direction-indicator'
import { Repository_LocalId } from '../../types'

export interface IRepositoryTransactionHistoryDao {

	findWhereGUIDsIn(
		GUIDs: string[]
	): Promise<IRepositoryTransactionHistory[]>

	findAllLocalChangesForRecordIds(
		changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository>
	): Promise<Map<Repository_LocalId, IRepositoryTransactionHistory[]>>;

	updateSyncTimestamp(
		repositoryTransactionHistory: IRepositoryTransactionHistory
	): Promise<void>

}

export interface IChangedRecordIdsForRepository {
	actorRecordIdsByLocalIds: Map<ApplicationEntity_LocalId, Map<Actor_LocalId, Set<RecordHistory_ActorRecordId>>>;
	firstChangeTime: number;
}

@Injected()
export class RepositoryTransactionHistoryDao
	extends BaseRepositoryTransactionHistoryDao
	implements IRepositoryTransactionHistoryDao {

	@Inject()
	datastructureUtils: IDatastructureUtils

	/*
	async clearContentsWhereIdsIn(
		repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]
	): Promise<void> {
		const rtb: QRepositoryTransactionBlock = Q.QRepositoryTransactionBlock
		await this.db.updateWhere({
			UPDATE: rtb,
			SET: {
				contents: null
			},
			WHERE: rtb._localId.IN(repositoryTransactionBlockIds)
		})
	}
	*/

	async findWhereGUIDsIn(
		GUIDs: string[]
	): Promise<IRepositoryTransactionHistory[]> {
		let rth: QRepositoryTransactionHistory
		return await this.db.find.tree({
			SELECT: {
				GUID: Y
			},
			FROM: [
				rth = Q.RepositoryTransactionHistory
			],
			WHERE: rth.GUID.IN(GUIDs)
		})
	}

	async findAllLocalChangesForRecordIds(
		changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository>
	): Promise<Map<Repository_LocalId, IRepositoryTransactionHistory[]>> {
		const repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
			= new Map()

		const rth: QRepositoryTransactionHistory = Q.RepositoryTransactionHistory
		const th: QTransactionHistory = rth.transactionHistory.INNER_JOIN()
		const oh: QOperationHistory = rth.operationHistory.LEFT_JOIN()
		const ae: QApplicationEntity = oh.entity.LEFT_JOIN()
		const av: QApplicationVersion = ae.applicationVersion.LEFT_JOIN()
		const rh: QRecordHistory = oh.recordHistory.LEFT_JOIN()
		const nv: QRecordHistoryNewValue = rh.newValues.LEFT_JOIN()
		let _localId = Y

		const repositoryEquals: JSONBaseOperation[] = []
		for (const [repositoryId, idsForRepository] of changedRecordIds) {
			const recordMapForRepository = idsForRepository.actorRecordIdsByLocalIds
			const entityEquals: JSONBaseOperation[] = []
			for (const [entityId, recordMapForEntity] of recordMapForRepository) {
				const actorEquals: JSONBaseOperation[] = []
				for (const [actorId, recordsForActor] of recordMapForEntity) {
					actorEquals.push(AND(
						oh.actor._localId.equals(actorId),
						rh._actorRecordId.IN(Array.from(recordsForActor))
					))
				}
				entityEquals.push(AND(
					oh.entity._localId.equals(entityId),
					OR(...actorEquals)
				))
			}
			repositoryEquals.push(AND(
				rth.repository._localId.equals(repositoryId),
				rth.saveTimestamp.greaterThanOrEquals(idsForRepository.firstChangeTime),
				OR(...entityEquals)
			))
		}

		const repoTransHistories = await this.db.find.tree({
			SELECT: {
				...ALL_FIELDS,
				operationHistory: {
					orderNumber: Y,
					changeType: Y,
					entity: {
						_localId,
						// index: Y,
						applicationVersion: {
							_localId: Y,
							// integerVersion: Y,
							// application: {
							// 	index: Y
							// }
						}
					},
					recordHistory: {
						_localId,
						newValues: {
							columnIndex: Y,
							newValue: Y
						}
					}
				}
			},
			FROM: [
				rth,
				th,
				oh,
				ae,
				av,
				rh,
				nv

			],
			WHERE: AND(
				th.transactionType.equals(TransactionType.LOCAL),
				OR(...repositoryEquals)
			),
			// ORDER_BY: [
			// 	rth.repository._localId.ASC()
			// ]
		})

		for (const repoTransHistory of repoTransHistories) {
			this.datastructureUtils.ensureChildArray(
				repositoryTransactionHistoryMapByRepositoryId, repoTransHistory.repository._localId)
				.push(repoTransHistory)
			repoTransHistory.operationHistory.sort((
				rth1: OperationHistory,
				rth2: OperationHistory
			) => {
				if (rth1.orderNumber < rth2.orderNumber) {
					return -1
				}
				if (rth1.orderNumber > rth2.orderNumber) {
					return 1
				}
				return 0
			})
		}

		return repositoryTransactionHistoryMapByRepositoryId
	}

	async updateSyncTimestamp(
		repositoryTransactionHistory: IRepositoryTransactionHistory
	): Promise<void> {
		let rth: QRepositoryTransactionHistory

		await this.db.updateWhere({
			UPDATE: rth = Q.RepositoryTransactionHistory,
			SET: {
				syncTimestamp: repositoryTransactionHistory.syncTimestamp
			},
			WHERE: rth._localId.equals(repositoryTransactionHistory._localId)
		})
	}
}
