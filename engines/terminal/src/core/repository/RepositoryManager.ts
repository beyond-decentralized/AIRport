import {
	and,
	IEntityUpdateProperties,
	IQEntityInternal,
	IQOperableFieldInternal,
	RawDelete,
	RawInsertValues,
	RawUpdate,
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IContext } from '@airport/direction-indicator'
import {
	IActor,
	IRepository,
	IRepositoryDao,
	QRepositoryEntity
} from '@airport/holding-pattern-runtime'
import {
	IOperationContext,
	IRepositoryManager,
	REPOSITORY_FIELD,
	UpdateState,
} from '@airport/terminal-map'
import { v4 as uuidv4 } from "uuid";

/**
 * Created by Papa on 2/12/2017.
 */

export interface RepoQueryData {
	[entityName: string]: EntityRepoQueryData;
}

export interface EntityRepoQueryData {
	qEntity: IQEntityInternal,
	idProperty: string;
}

@Injected()
export class RepositoryManager
	implements IRepositoryManager {

	@Inject()
	repositoryDao: IRepositoryDao

	async initialize(): Promise<void> {
	}

	async createRepository(
		actor: IActor,
		context: IOperationContext
	): Promise<IRepository> {
		if (context.newRepository) {
			throw new Error(`Cannot create more than one repository per transaction:
Attempting to create a new repository and Operation Context
already contains a new repository.`)
		}
		let repository = await this.createRepositoryRecord(actor, context)

		context.newRepository = repository

		return repository
	}

	goOffline(): void {
		throw new Error(`not implemented`)
	}

	getUpdateState(repository: IRepository): UpdateState {
		throw new Error(`not implemented`)
	}

	setUpdateStateForAll(updateState: UpdateState): void {
		throw new Error(`not implemented`)
	}

	setUpdateState(
		repository: IRepository,
		updateState: UpdateState
	): void {
		throw new Error(`not implemented`)
	}


	private getRepositoryRecord(
		actor: IActor
	): IRepository {
		const repository: IRepository = {
			ageSuitability: 0,
			createdAt: new Date(),
			id: null,
			immutable: false,
			owner: actor.user,
			// platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
			// platformConfig: null,
			repositoryTransactionHistory: [],
			source: 'localhost:9000',
			uuId: uuidv4(),
		}

		return repository
	}

	private async createRepositoryRecord(
		actor: IActor,
		context?: IContext
	): Promise<IRepository> {
		const repository: IRepository = this.getRepositoryRecord(actor)

		await this.repositoryDao.save(repository, context)

		return repository
	}

	ensureRepositoryScopeOnInsertValues<IQE extends IQEntityInternal>(
		repository: IRepository,
		rawInsertValues: RawInsertValues<IQE>
	): RawInsertValues<IQE> {
		let qEntity = rawInsertValues.insertInto
		if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
			return rawInsertValues
		}

		let columns = rawInsertValues.columns.slice()
		if (columns.some((
			column: IQOperableFieldInternal<any, any, any, any>,
			index
		) => {
			// return column.fieldName === REPOSITORY_FIELD
			return column.dbProperty.name === REPOSITORY_FIELD
		})) {
			return rawInsertValues
		}
		columns.push(qEntity[REPOSITORY_FIELD])

		let values = rawInsertValues.values.slice()
		for (let i = 0; i < values.length; i++) {
			let row = values[i].slice()
			values[i] = row
			row.push(repository.id)
		}

		return {
			insertInto: qEntity, columns: columns, values: values
		}
	}

	ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal>(
		qEntity: IQEntityInternal,
		repository: IRepository,
		rawUpdate: RawUpdate<IEUP, IQE>
	): RawUpdate<IEUP, IQE> {
		if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
			return
		}
		return {
			update: rawUpdate.update,
			set: rawUpdate.set,
			where: and(rawUpdate.where, (<QRepositoryEntity><any>qEntity).repository.id.equals(repository.id))
		}
	}

	ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal>(
		qEntity: IQE,
		repository: IRepository,
		rawDelete: RawDelete<IQE>
	): RawDelete<IQE> {
		if (!qEntity.__driver__.dbEntity.isRepositoryEntity) {
			return
		}
		return {
			deleteFrom: rawDelete.deleteFrom,
			where: and(rawDelete.where, (<QRepositoryEntity><any>qEntity).repository.id.equals(repository.id))
		}
	}

}
