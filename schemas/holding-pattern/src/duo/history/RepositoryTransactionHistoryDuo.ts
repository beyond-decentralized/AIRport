import {DI}                     from '@airport/di'
import {
	ChangeType,
	DbEntity
}                               from '@airport/ground-control'
import {
	ActorId,
	Repository,
	RepositoryId,
	RepositoryTransactionHistory,
	SystemWideOperationId
} from '../../ddl/ddl'
import {REPO_TRANS_HISTORY_DUO} from '../../diTokens'
import {
	BaseRepositoryTransactionHistoryDuo,
	IActor,
	IOperationHistory,
	IRepository,
	IRepositoryTransactionHistory,
}                               from '../../generated/generated'
import {IOperationHistoryDuo}   from './OperationHistoryDuo'

export interface IRepositoryTransactionHistoryDuo {

	getNewRecord(
		repositoryId: RepositoryId,
		actor: IActor
	): IRepositoryTransactionHistory;

	newRecord(
		data?: IRepositoryTransactionHistory
	): IRepositoryTransactionHistory;

	sortRepoTransHistories(
		repoTransHistories: IRepositoryTransactionHistory[],
		actorMapById: Map<ActorId, IActor>
	): void;

	startOperation(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		operHistoryDuo: IOperationHistoryDuo
	): IOperationHistory;

}

export class RepositoryTransactionHistoryDuo
	extends BaseRepositoryTransactionHistoryDuo
	implements IRepositoryTransactionHistoryDuo {

	getNewRecord(
		repositoryId: RepositoryId,
		actor: IActor
	): IRepositoryTransactionHistory {
		let transaction = new RepositoryTransactionHistory()

		let saveTimestamp = new Date()

		transaction.saveTimestamp = saveTimestamp
		transaction.repository    = new Repository()
		transaction.repository.id = repositoryId
		transaction.actor         = actor
		// transaction.syncStatus = SyncStatus.SYNC_PENDING;

		return transaction
	}

	newRecord(
		data?: IRepositoryTransactionHistory
	): IRepositoryTransactionHistory {
		if (!data) {
			return null
		}

		return {...data}
	}

	sortRepoTransHistories(
		repoTransHistories: IRepositoryTransactionHistory[],
		actorMapById: Map<ActorId, IActor>
	): void {
		repoTransHistories.sort((
			repoTransHistory1: IRepositoryTransactionHistory,
			repoTransHistory2: IRepositoryTransactionHistory
		) => {
			const saveTimeComparison
				      = this.compareDates(repoTransHistory1.saveTimestamp, repoTransHistory2.saveTimestamp)
			if (saveTimeComparison) {
				return saveTimeComparison
			}

			const actor1 = actorMapById.get(repoTransHistory1.actor.id)
			const actor2 = actorMapById.get(repoTransHistory2.actor.id)

			const userIdComparison = actor1.user.uniqueId.localeCompare(actor2.user.uniqueId)
			if (userIdComparison) {
				return userIdComparison
			}

			const databaseNameComparison = actor1.terminal.name.localeCompare(actor2.terminal.name)
			if (databaseNameComparison) {
				return databaseNameComparison
			}

			const databaseSecondIdComparison
				      = this.compareNumbers(actor1.terminal.secondId, actor2.terminal.secondId)
			if (databaseSecondIdComparison) {
				return databaseSecondIdComparison
			}

			const databaseOwnerComparison
				      = actor1.terminal.owner.uniqueId.localeCompare(actor2.terminal.owner.uniqueId)
			if (databaseOwnerComparison) {
				return databaseOwnerComparison
			}

			const actorRandomIdComparison
				      = this.compareNumbers(actor1.randomId, actor2.randomId)
			return actorRandomIdComparison
		})
	}

	startOperation(
		repositoryTransactionHistory: IRepositoryTransactionHistory,
		systemWideOperationId: SystemWideOperationId,
		entityChangeType: ChangeType,
		dbEntity: DbEntity,
		operHistoryDuo: IOperationHistoryDuo
	): IOperationHistory {
		let operationHistory = operHistoryDuo.getNewRecord(
			entityChangeType, dbEntity, repositoryTransactionHistory,
			systemWideOperationId)
		repositoryTransactionHistory.operationHistory.push(operationHistory)

		repositoryTransactionHistory
			.transactionHistory.allOperationHistory.push(operationHistory)

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

DI.set(REPO_TRANS_HISTORY_DUO, RepositoryTransactionHistoryDuo)
