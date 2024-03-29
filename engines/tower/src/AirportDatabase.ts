import {
	IAirportDatabase,
	IDatabaseState,
	IEntityAccumulator,
	IEntityRecord,
	IQApplicationBuilderUtils,
	QAppInternal
} from '@airport/air-traffic-control';
import { QApp } from '@airport/aviation-communication'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IApplication,
	IApplicationVersion,
	DbEntity,
	Dictionary,
	IApplicationUtils,
	IApplicationNameUtils,
	ISaveResult,
} from '@airport/ground-control';
import {
	IDatabaseFacade,
	INonEntityFind,
	INonEntityFindOne,
	INonEntitySearch,
	INonEntitySearchOne,
	OperationName
} from '@airport/tarmaq-dao';
import { IEntityContext } from '@airport/tarmaq-entity';
import {
	IFunctionsAndOperators,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	IQueryRelationManager,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns,
} from '@airport/tarmaq-query';

class EntityAccumulator
	implements IEntityAccumulator {

	constructor(
		private applicationDomain: string,
		private applicationName: string,
		private entityMap: Map<any, IEntityRecord>,
	) {
	}

	add(
		clazz: any,
		index: number,
	): void {
		this.entityMap.set(clazz, {
			entity: {
				index,
				name: clazz.name,
			},
			application: {
				domain: this.applicationDomain,
				name: this.applicationName,
			},
		});
	}
}

@Injected()
export class AirportDatabase
	implements IAirportDatabase {

	@Inject()
	appliationUtils: IApplicationUtils

	@Inject()
	databaseFacade: IDatabaseFacade

	@Inject()
	databaseStore: IDatabaseState

	@Inject()
	dictionary: Dictionary

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	find: INonEntityFind

	@Inject()
	findOne: INonEntityFindOne

	@Inject()
	qApplicationBuilderUtils: IQApplicationBuilderUtils

	@Inject()
	queryRelationManager: IQueryRelationManager

	@Inject()
	search: INonEntitySearch

	@Inject()
	searchOne: INonEntitySearchOne

	get entityMap(): Map<any, IEntityRecord> {
		return this.databaseStore.entityMap
	};

	get F(): IFunctionsAndOperators {
		return this.databaseStore.functions
	}

	get functions(): IFunctionsAndOperators {
		return this.databaseStore.functions
	}

	get A(): IApplication[] {
		return this.databaseStore.applications
	}

	get applications(): IApplication[] {
		return this.databaseStore.applications
	}

	get qApplications(): QApp[] {
		return this.databaseStore.qApplications
	}
	get Q(): QApp[] {
		return this.databaseStore.qApplications
	}

	get QM(): { [name: string]: QApp } {
		return this.databaseStore.QM
	}

	async load(): Promise<any> {
		// Calling this method loads the AirpotDatabase object
		// ('this.airportDatabase' statement by itself creates the object,
		// (without the '.load() call) but '.load()' is more intuitive)
	}

	getCurrentIApplicationVersion(
		domainName: string,
		applicationName: string
	): IApplicationVersion {
		const applicationFullName = this.applicationNameUtils
			.getApplication_FullNameFromDomainAndName(domainName, applicationName)
		return (this.QM[applicationFullName] as QAppInternal)
			.__dbApplication__.currentVersion[0].applicationVersion
	}

	getDbEntity(
		domainName: string,
		applicationName: string,
		entityName: string
	): DbEntity {
		const dbApplicationVersion = this.getCurrentIApplicationVersion(
			domainName,
			applicationName
		)

		return dbApplicationVersion.entityMapByName[entityName]
	}

	setQApp(
		qApplication: QApp
	): void {
		const fullApplication_Name = this.applicationNameUtils
			.getApplication_FullName(qApplication)
		const existingQApp = this.QM[fullApplication_Name]
		if (existingQApp) {
			const dbApplication = existingQApp.__dbApplication__
			if (dbApplication) {
				qApplication.__dbApplication__ = dbApplication
				this.qApplicationBuilderUtils.setQAppEntities(dbApplication, qApplication, this.qApplications,
					this.appliationUtils, this.queryRelationManager)
				this.Q[dbApplication.index] = qApplication
			}
		}
		this.QM[fullApplication_Name] = qApplication
	}

	getAccumulator(
		applicationDomain: string,
		applicationName: string,
	): IEntityAccumulator {
		return new EntityAccumulator(applicationDomain, applicationName, this.entityMap);
	}

	async insertColumnValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>
		},
		context?: IEntityContext,
	): Promise<number> {
		return await this.databaseFacade.insertColumnValues(rawInsertValues, context);
	}

	async insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
		context?: IEntityContext,
	): Promise<number> {
		return await this.databaseFacade.insertValues(rawInsertValues, context);
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>
		},
		context?: IEntityContext,
	): Promise<number[] | string[] | number[][] | string[][]> {
		return await this.databaseFacade.insertColumnValuesGenerateIds(rawInsertValues, context);
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
		context?: IEntityContext,
	): Promise<number[] | string[] | number[][] | string[][]> {
		return await this.databaseFacade.insertValuesGenerateIds(rawInsertValues, context);
	}

	/**
	 * Creates an entity with a WHERE clause - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records deleted
	 */
	async deleteWhere<IQE extends IQEntity>(
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
		context?: IEntityContext,
	): Promise<number> {
		return await this.databaseFacade.deleteWhere(rawDelete, context);
	}

	/**
	 * Ether creates or updates an entity - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records saved (1 or 0)
	 */
	async save<E>(
		entity: E,
		context?: IEntityContext,
		operationName?: OperationName,
	): Promise<ISaveResult> {
		return await this.databaseFacade.save(entity, context);
	}

	/**
	 * Updates an entity with a WHERE clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(
		rawUpdateColumns: RawUpdateColumns<IEUC, IQE>
			| {
				(...args: any[]): RawUpdateColumns<IEUC, IQE>
			},
		context?: IEntityContext,
	): Promise<number> {
		return await this.databaseFacade.updateColumnsWhere(rawUpdateColumns, context);
	}

	/**
	 * Updates an entity with a WHERE clause, using a property based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	async updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(
		rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
			(...args: any[]): RawUpdate<IEUP, IQE>
		},
		context?: IEntityContext,
	): Promise<number> {
		return await this.databaseFacade.updateWhere(rawUpdate, context);
	}
}

export function injectAirportDatabase(): void {
	console.log('Injecting AirportDatabase');
}
