import {
	REPOSITORY_PROPERTY_NAME,
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
	QAirEntity
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index' // default
// import is reserved for Application use
import {
	AND,
	IEntityUpdateProperties,
	IQEntityInternal,
	IQOperableFieldInternal,
	RawDelete,
	RawInsertValues,
	RawUpdate,
} from '@airport/tarmaq-query'
import {
	IOperationContext,
	IRepositoryManager,
	UpdateState,
} from '@airport/terminal-map'
import { v4 as guidv4 } from "uuid";

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
			_localId: null,
			immutable: false,
			owner: actor.userAccount,
			// platformConfig: platformConfig ? JSON.stringify(platformConfig) : null,
			// platformConfig: null,
			repositoryTransactionHistory: [],
			source: 'localhost:9000',
			GUID: guidv4(),
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
		let qEntity = rawInsertValues.INSERT_INTO
		if (!qEntity.__driver__.dbEntity.isAirEntity) {
			return rawInsertValues
		}

		let columns = rawInsertValues.columns.slice()
		if (columns.some((
			column: IQOperableFieldInternal<any, any, any, any>,
			index
		) => {
			// return column.fieldName === REPOSITORY_PROPERTY_NAME
			return column.dbProperty.name === REPOSITORY_PROPERTY_NAME
		})) {
			return rawInsertValues
		}
		columns.push(qEntity[REPOSITORY_PROPERTY_NAME])

		let VALUES = rawInsertValues.VALUES.slice()
		for (let i = 0; i < VALUES.length; i++) {
			let row = VALUES[i].slice()
			VALUES[i] = row
			row.push(repository._localId)
		}

		return {
			INSERT_INTO: qEntity, columns, VALUES
		}
	}

	ensureRepositoryLinkOnUpdateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntityInternal>(
		qEntity: IQEntityInternal,
		repository: IRepository,
		rawUpdate: RawUpdate<IEUP, IQE>
	): RawUpdate<IEUP, IQE> {
		if (!qEntity.__driver__.dbEntity.isAirEntity) {
			return
		}
		return {
			UPDATE: rawUpdate.UPDATE,
			SET: rawUpdate.SET,
			WHERE: AND(rawUpdate.WHERE, (<QAirEntity><any>qEntity).repository._localId.equals(repository._localId))
		}
	}

	ensureRepositoryScopeOnDeleteWhere<IQE extends IQEntityInternal>(
		qEntity: IQE,
		repository: IRepository,
		rawDelete: RawDelete<IQE>
	): RawDelete<IQE> {
		if (!qEntity.__driver__.dbEntity.isAirEntity) {
			return
		}
		return {
			DELETE_FROM: rawDelete.DELETE_FROM,
			WHERE: AND(rawDelete.WHERE, (<QAirEntity><any>qEntity).repository._localId.equals(repository._localId))
		}
	}

}
