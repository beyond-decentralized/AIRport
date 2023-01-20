import { Inject, Injected } from '@airport/direction-indicator';
import {
	Actor_LocalId,
	ChangeType,
	DbEntity,
	IActor,
	IOperationHistory,
	IRepository,
	IRepositoryTransactionHistory,
	IRootTransaction,
	RepositoryTransactionHistory_IsRepositoryCreation,
	Repository_IsPublic,
	Repository_LocalId,
	SystemWideOperationId
} from '@airport/ground-control'
import { v4 as guidv4 } from "uuid";
import {
	Repository,
	RepositoryTransactionHistory
} from '../../ddl/ddl'
import { IOperationHistoryDuo } from './OperationHistoryDuo'

export interface IRepositoryTransactionHistoryDuo {

	getNewRecord(
		repositoryId: Repository_LocalId,
		actor: IActor,
		isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation,
		isPublic: Repository_IsPublic
	): IRepositoryTransactionHistory;

	newRecord(
		data?: IRepositoryTransactionHistory
	): IRepositoryTransactionHistory;

	sortRepoTransHistories(
		repoTransHistories: IRepositoryTransactionHistory[],
		actorMapById: Map<Actor_LocalId, IActor>
	): void;

	startOperation(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		rootTransaction: IRootTransaction
	): IOperationHistory;

}

@Injected()
export class RepositoryTransactionHistoryDuo
	implements IRepositoryTransactionHistoryDuo {

	@Inject()
	operationHistoryDuo: IOperationHistoryDuo

	getNewRecord(
		repositoryId: Repository_LocalId,
		actor: IActor,
		isRepositoryCreation: RepositoryTransactionHistory_IsRepositoryCreation,
		isPublic: Repository_IsPublic
	): IRepositoryTransactionHistory {
		let repositoryTransactionHistory: IRepositoryTransactionHistory = new RepositoryTransactionHistory() as IRepositoryTransactionHistory

		let saveTimestamp = new Date().getTime()

		repositoryTransactionHistory.saveTimestamp = saveTimestamp
		repositoryTransactionHistory.actor = actor
		repositoryTransactionHistory.GUID = guidv4()
		repositoryTransactionHistory.isRepositoryCreation = isRepositoryCreation
		repositoryTransactionHistory.isPublic = isPublic
		repositoryTransactionHistory.repository = new Repository() as IRepository
		repositoryTransactionHistory.repository._localId = repositoryId

		return repositoryTransactionHistory
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
				= this.compareNumbers(repoTransHistory1.syncTimestamp, repoTransHistory2.syncTimestamp)
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
		rootTransaction: IRootTransaction
	): IOperationHistory {
		let operationHistory = this.operationHistoryDuo.getNewRecord(
			entityChangeType, dbEntity, repositoryTransactionHistory,
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
				for (let i = repositoryTransactionHistory.operationHistory.length - 1; i >= 0; i--) {
					const currentOperationHistory = repositoryTransactionHistory.operationHistory[i];
					if (currentOperationHistory === operationHistory) {
						repositoryTransactionHistory.operationHistory.splice(i, 1);
						break;
					}
				}
			}
		}*/

}
