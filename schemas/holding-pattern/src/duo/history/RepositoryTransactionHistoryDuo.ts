import {
	ChangeType,
	DbEntity,
	IRootTransaction
} from '@airport/ground-control'
import { v4 as uuidv4 } from "uuid";
import {
	Actor_Id,
	Repository,
	Repository_Id,
	RepositoryTransactionHistory,
	SystemWideOperationId
} from '../../ddl/ddl'
import {
	BaseRepositoryTransactionHistoryDuo,
	IActor,
	IOperationHistory,
	IRepository,
	IRepositoryTransactionHistory,
} from '../../generated/generated'
import { IOperationHistoryDuo } from './OperationHistoryDuo'

export interface IRepositoryTransactionHistoryDuo {

	getNewRecord(
		repositoryId: Repository_Id,
		isRepositoryCreation: boolean
	): IRepositoryTransactionHistory;

	newRecord(
		data?: IRepositoryTransactionHistory
	): IRepositoryTransactionHistory;

	sortRepoTransHistories(
		repoTransHistories: IRepositoryTransactionHistory[],
		actorMapById: Map<Actor_Id, IActor>
	): void;

	startOperation(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		actor: IActor,
		rootTransaction: IRootTransaction
	): IOperationHistory;

}

export class RepositoryTransactionHistoryDuo
	extends BaseRepositoryTransactionHistoryDuo
	implements IRepositoryTransactionHistoryDuo {

	operationHistoryDuo: IOperationHistoryDuo

	getNewRecord(
		repositoryId: Repository_Id,
		isRepositoryCreation: boolean
	): IRepositoryTransactionHistory {
		let repositoryTransactionHistory: IRepositoryTransactionHistory = new RepositoryTransactionHistory() as IRepositoryTransactionHistory

		let saveTimestamp = new Date().getTime()

		repositoryTransactionHistory.saveTimestamp = saveTimestamp
		repositoryTransactionHistory.uuId = uuidv4()
		repositoryTransactionHistory.isRepositoryCreation = isRepositoryCreation
		repositoryTransactionHistory.repository = new Repository() as IRepository
		repositoryTransactionHistory.repository.id = repositoryId

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
		actorMapById: Map<Actor_Id, IActor>
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
		actor: IActor,
		rootTransaction: IRootTransaction
	): IOperationHistory {
		let operationHistory = this.operationHistoryDuo.getNewRecord(
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
