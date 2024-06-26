import { Inject, Injected } from '@airport/direction-indicator'
import {
	Actor_LocalId,
	ChangeType,
	DbEntity,
	IActor,
	IOperationHistory,
	IRepository,
	IRepositoryTransactionHistory,
	IRootTransaction,
	ITransactionHistory,
	RepositoryTransactionHistory_IsRepositoryCreation,
	Repository_LocalId,
	SystemWideOperationId
} from '@airport/ground-control'
import {
	Repository,
	RepositoryTransactionHistory
} from '../../ddl/ddl'
import { IOperationHistoryDuo } from './OperationHistoryDuo'

export interface IRepositoryTransactionHistoryDuo {

	getRepositoryTransactionHistory(
		repositoryLid: Repository_LocalId,
		transactionHistory: ITransactionHistory,
		isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation
	): IRepositoryTransactionHistory

	setModifiedRepository_LocalIdSet(
		repositoryTransactionHistory: IRepositoryTransactionHistory
	): void

	newRecord(
		data?: IRepositoryTransactionHistory
	): IRepositoryTransactionHistory

	sortRepoTransHistories(
		repoTransHistories: IRepositoryTransactionHistory[],
		actorMapById: Map<Actor_LocalId, IActor>
	): void

	startOperation(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		actor: IActor,
		rootTransaction: IRootTransaction
	): IOperationHistory

}

@Injected()
export class RepositoryTransactionHistoryDuo
	implements IRepositoryTransactionHistoryDuo {

	@Inject()
	operationHistoryDuo: IOperationHistoryDuo

	getRepositoryTransactionHistory(
		repositoryLid: Repository_LocalId,
		transactionHistory: ITransactionHistory,
		isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation
	): IRepositoryTransactionHistory {
		let repositoryTransactionHistory: IRepositoryTransactionHistory = new RepositoryTransactionHistory() as IRepositoryTransactionHistory

		let saveTimestamp = new Date().getTime()

		repositoryTransactionHistory.saveTimestamp = saveTimestamp
		repositoryTransactionHistory.isRepositoryCreation = isRepositoryCreation
		repositoryTransactionHistory.repository = new Repository() as IRepository
		repositoryTransactionHistory.repository._localId = repositoryLid
		repositoryTransactionHistory.transactionHistory = transactionHistory

		this.setModifiedRepository_LocalIdSet(repositoryTransactionHistory)

		return repositoryTransactionHistory
	}

	setModifiedRepository_LocalIdSet(
		repositoryTransactionHistory: IRepositoryTransactionHistory
	): void {
		repositoryTransactionHistory.modifiedRepository_LocalIdSet = new Set()
		const repositoryLocalId = repositoryTransactionHistory.repository._localId
		repositoryTransactionHistory.modifiedRepository_LocalIdSet
			.add(repositoryLocalId)
		repositoryTransactionHistory.transactionHistory.modifiedRepository_LocalIdSet
			.add(repositoryLocalId)
	}

	newRecord(
		data?: IRepositoryTransactionHistory
	): IRepositoryTransactionHistory {
		if (!data) {
			return null
		}

		return { ...data }
	}

	sortRepoTransHistories(
		repoTransHistories: IRepositoryTransactionHistory[],
		actorMapById: Map<Actor_LocalId, IActor>
	): void {
		repoTransHistories.sort((
			repoTransHistory1: IRepositoryTransactionHistory,
			repoTransHistory2: IRepositoryTransactionHistory
		) => {
			const syncTimeComparison
				= this.compareNumbers(repoTransHistory1.block?.syncTimestamp, repoTransHistory2.block?.syncTimestamp)
			if (syncTimeComparison) {
				return syncTimeComparison
			}
			const saveTimeComparison
				= this.compareNumbers(repoTransHistory1.saveTimestamp, repoTransHistory2.saveTimestamp)
			if (saveTimeComparison) {
				return saveTimeComparison
			}

			return 0
		})
	}

	startOperation(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		actor: IActor,
		rootTransaction: IRootTransaction
	): IOperationHistory {
		let operationHistory = this.operationHistoryDuo.getOperationHistory(
			entityChangeType, dbEntity, actor, repositoryTransactionHistory,
			systemWideOperationId, rootTransaction)
		repositoryTransactionHistory.operationHistory.push(operationHistory)

		repositoryTransactionHistory
			.transactionHistory.allOperationHistory.push(<any>operationHistory)

		return operationHistory
	}

	private compareDates(
		date1: Date,
		date2: Date
	): number {
		const time1 = date1 ? date1.getTime() : -1
		const time2 = date2 ? date2.getTime() : -1

		return this.compareNumbers(time1, time2)
	}

	private compareNumbers(
		number1: number,
		number2: number
	): number {
		if (number1 < number2) {
			return -1
		}
		if (number2 > number1) {
			return 1
		}
		return 0
	}

	/*
		static endOperation(
			repositoryTransactionHistory: RepositoryTransactionHistory,
			operationHistory: OperationHistory
		): void {
			if (operationHistory.endEntityHistoryIndexInTrans
				=== operationHistory.startEntityHistoryIndexInTrans) {
				for (let i = repositoryTransactionHistory.operationHistory.length - 1 i >= 0 i--) {
					const currentOperationHistory = repositoryTransactionHistory.operationHistory[i]
					if (currentOperationHistory === operationHistory) {
						repositoryTransactionHistory.operationHistory.splice(i, 1)
						break
					}
				}
			}
		}*/

}
