import {
	ALL_FIELDS,
	and,
	or,
	Y
} from '@airport/air-traffic-control'
import {
	ensureChildArray,
	EntityId,
	JSONBaseOperation,
	TransactionType
} from '@airport/ground-control'
import {
	Actor_Id,
	RecordHistoryActorRecordId,
	Repository_Id,
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

export interface IRepositoryTransactionHistoryDao {

	findWhereUuIdsIn(
		uuIds: string[]
	): Promise<IRepositoryTransactionHistory[]>

	findAllLocalChangesForRecordIds(
		changedRecordIds: Map<Repository_Id, IChangedRecordIdsForRepository>
	): Promise<Map<Repository_Id, IRepositoryTransactionHistory[]>>;

	updateSyncTimestamp(
		repositoryTransactionHistory: IRepositoryTransactionHistory
	): Promise<void>

}

export interface IChangedRecordIdsForRepository {
	ids: Map<EntityId, Map<Actor_Id, Set<RecordHistoryActorRecordId>>>;
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
			where: rtb.id.in(repositoryTransactionBlockIds)
		})
	}
	*/

	async findWhereUuIdsIn(
		uuIds: string[]
	): Promise<IRepositoryTransactionHistory[]> {
		let rth: QRepositoryTransactionHistory
		return await this.db.find.tree({
			select: {
				uuId: Y
			},
			from: [
				rth = Q.RepositoryTransactionHistory
			],
			where: rth.uuId.in(uuIds)
		})
	}

	async findAllLocalChangesForRecordIds(
		changedRecordIds: Map<Repository_Id, IChangedRecordIdsForRepository>
	): Promise<Map<Repository_Id, IRepositoryTransactionHistory[]>> {
		const repositoryTransactionHistoryMapByRepositoryId: Map<Repository_Id, IRepositoryTransactionHistory[]>
			= new Map()

		const rth: QRepositoryTransactionHistory = Q.RepositoryTransactionHistory
		const th: QTransactionHistory = rth.transactionHistory.innerJoin()
		const oh: QOperationHistory = rth.operationHistory.leftJoin()
		const ae: QApplicationEntity = oh.entity.leftJoin()
		const av: QApplicationVersion = ae.applicationVersion.leftJoin()
		const rh: QRecordHistory = oh.recordHistory.leftJoin()
		const nv: QRecordHistoryNewValue = rh.newValues.leftJoin()
		let id = Y

		const repositoryEquals: JSONBaseOperation[] = []
		for (const [repositoryId, idsForRepository] of changedRecordIds) {
			const recordMapForRepository = idsForRepository.ids
			const entityEquals: JSONBaseOperation[] = []
			for (const [entityId, recordMapForEntity] of recordMapForRepository) {
				const actorEquals: JSONBaseOperation[] = []
				for (const [actorId, recordsForActor] of recordMapForEntity) {
					actorEquals.push(and(
						oh.actor.id.equals(actorId),
						rh.actorRecordId.in(Array.from(recordsForActor))
					))
				}
				entityEquals.push(and(
					oh.entity.id.equals(entityId),
					or(...actorEquals)
				))
			}
			repositoryEquals.push(and(
				rth.repository.id.equals(repositoryId),
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
						id,
						// index: Y,
						applicationVersion: {
							id: Y,
							// integerVersion: Y,
							// application: {
							// 	index: Y
							// }
						}
					},
					recordHistory: {
						id,
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
			// 	rth.repository.id.asc()
			// ]
		})

		for (const repoTransHistory of repoTransHistories) {
			ensureChildArray(
				repositoryTransactionHistoryMapByRepositoryId, repoTransHistory.repository.id)
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
			where: rth.id.equals(repositoryTransactionHistory.id)
		})
	}
}
