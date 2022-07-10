import {
	ALL_FIELDS,
	and,
	or,
	Y
} from '@airport/tarmaq-query'
import {
	ensureChildArray,
	ApplicationEntity_LocalId,
	JSONBaseOperation,
	TransactionType
} from '@airport/ground-control'
import {
	Actor_LocalId,
	RecordHistory_ActorRecordId,
} from '../../ddl/ddl'
import {
	BaseRepositoryTransactionHistoryDao,
	IOperationHistory,
	IRepositoryTransactionHistory,
	Q,
	QOperationHistory,
	QRecordHistory,
	QRecordHistoryNewValue,
	QRepositoryTransactionHistory,
	QTransactionHistory,
} from '../../generated/generated'
import { QApplicationEntity, QApplicationVersion } from '@airport/airspace'
import { Injected } from '@airport/direction-indicator'
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
	/*
	async clearContentsWhereIdsIn(
		repositoryTransactionBlockIds: TmRepositoryTransactionBlockId[]
	): Promise<void> {
		const rtb: QRepositoryTransactionBlock = Q.QRepositoryTransactionBlock
		await this.db.updateWhere({
			update: rtb,
			set: {
				contents: null
			},
			where: rtb._localId.in(repositoryTransactionBlockIds)
		})
	}
	*/

	async findWhereGUIDsIn(
		GUIDs: string[]
	): Promise<IRepositoryTransactionHistory[]> {
		let rth: QRepositoryTransactionHistory
		return await this.db.find.tree({
			select: {
				GUID: Y
			},
			from: [
				rth = Q.RepositoryTransactionHistory
			],
			where: rth.GUID.in(GUIDs)
		})
	}

	async findAllLocalChangesForRecordIds(
		changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository>
	): Promise<Map<Repository_LocalId, IRepositoryTransactionHistory[]>> {
		const repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
			= new Map()

		const rth: QRepositoryTransactionHistory = Q.RepositoryTransactionHistory
		const th: QTransactionHistory = rth.transactionHistory.innerJoin()
		const oh: QOperationHistory = rth.operationHistory.leftJoin()
		const ae: QApplicationEntity = oh.entity.leftJoin()
		const av: QApplicationVersion = ae.applicationVersion.leftJoin()
		const rh: QRecordHistory = oh.recordHistory.leftJoin()
		const nv: QRecordHistoryNewValue = rh.newValues.leftJoin()
		let _localId = Y

		const repositoryEquals: JSONBaseOperation[] = []
		for (const [repositoryId, idsForRepository] of changedRecordIds) {
			const recordMapForRepository = idsForRepository.actorRecordIdsByLocalIds
			const entityEquals: JSONBaseOperation[] = []
			for (const [entityId, recordMapForEntity] of recordMapForRepository) {
				const actorEquals: JSONBaseOperation[] = []
				for (const [actorId, recordsForActor] of recordMapForEntity) {
					actorEquals.push(and(
						oh.actor._localId.equals(actorId),
						rh._actorRecordId.in(Array.from(recordsForActor))
					))
				}
				entityEquals.push(and(
					oh.entity._localId.equals(entityId),
					or(...actorEquals)
				))
			}
			repositoryEquals.push(and(
				rth.repository._localId.equals(repositoryId),
				rth.saveTimestamp.greaterThanOrEquals(idsForRepository.firstChangeTime),
				or(...entityEquals)
			))
		}

		const repoTransHistories = await this.db.find.tree({
			select: {
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
			from: [
				rth,
				th,
				oh,
				ae,
				av,
				rh,
				nv

			],
			where: and(
				th.transactionType.equals(TransactionType.LOCAL),
				or(...repositoryEquals)
			),
			// orderBy: [
			// 	rth.repository._localId.asc()
			// ]
		})

		for (const repoTransHistory of repoTransHistories) {
			ensureChildArray(
				repositoryTransactionHistoryMapByRepositoryId, repoTransHistory.repository._localId)
				.push(repoTransHistory)
			repoTransHistory.operationHistory.sort((
				rth1: IOperationHistory,
				rth2: IOperationHistory
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
			update: rth = Q.RepositoryTransactionHistory,
			set: {
				syncTimestamp: repositoryTransactionHistory.syncTimestamp
			},
			where: rth._localId.equals(repositoryTransactionHistory._localId)
		})
	}
}
