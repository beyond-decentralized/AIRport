import {DI}                     from '@airport/di'
import {
	ChangeType,
	DbEntity
}                               from '@airport/ground-control'
import { v4 as uuidv4 } from "uuid";
import {
	Actor_Id,
	Repository,
	Repository_Id,
	RepositoryTransactionHistory,
	SystemWideOperationId
} from '../../ddl/ddl'
import {REPOSITORY_TRANSACTION_HISTORY_DUO} from '../../tokens'
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
		repositoryId: Repository_Id,
		actor: IActor
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
		operHistoryDuo: IOperationHistoryDuo
	): IOperationHistory;

}

export class RepositoryTransactionHistoryDuo
	extends BaseRepositoryTransactionHistoryDuo
	implements IRepositoryTransactionHistoryDuo {

	getNewRecord(
		repositoryId: Repository_Id,
		actor: IActor
	): IRepositoryTransactionHistory {
		let repositoryTransactionHistory: IRepositoryTransactionHistory = new RepositoryTransactionHistory() as IRepositoryTransactionHistory

		let saveTimestamp = new Date().getTime()

		repositoryTransactionHistory.saveTimestamp = saveTimestamp
		repositoryTransactionHistory.uuId = uuidv4()
		repositoryTransactionHistory.repository    = new Repository() as IRepository
		repositoryTransactionHistory.repository.id = repositoryId
		repositoryTransactionHistory.actor         = actor

		return repositoryTransactionHistory
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
		actorMapById: Map<Actor_Id, IActor>
	): void {
		repoTransHistories.sort((
			repoTransHistory1: IRepositoryTransactionHistory,
			repoTransHistory2: IRepositoryTransactionHistory
		) => {
			const saveTimeComparison
				      = this.compareNumbers(repoTransHistory1.saveTimestamp, repoTransHistory2.saveTimestamp)
			if (saveTimeComparison) {
				return saveTimeComparison
			}

			const actor1 = actorMapById.get(repoTransHistory1.actor.id)
			const actor2 = actorMapById.get(repoTransHistory2.actor.id)

			const userIdComparison = actor1.user.uuId.localeCompare(actor2.user.uuId)
			if (userIdComparison) {
				return userIdComparison
			}

			const databaseUuidComparison = actor1.terminal.uuId.localeCompare(actor2.terminal.uuId)
			if (databaseUuidComparison) {
				return databaseUuidComparison
			}

			const databaseOwnerComparison
				      = actor1.terminal.owner.uuId.localeCompare(actor2.terminal.owner.uuId)
			if (databaseOwnerComparison) {
				return databaseOwnerComparison
			}

			const actorRandomIdComparison = actor1.uuId.localeCompare(actor2.uuId)

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

DI.set(REPOSITORY_TRANSACTION_HISTORY_DUO, RepositoryTransactionHistoryDuo)
