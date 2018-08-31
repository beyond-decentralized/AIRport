import {
	AirportDatabaseToken,
	and,
	distinct,
	field,
	IAirportDatabase,
	IQNumberField,
	IUtils,
	JSONLogicalOperation,
	or,
	RawFieldQuery,
	UtilsToken,
	Y
}                from "@airport/air-control";
import {
	ChangeType,
	EntityId,
	JSONBaseOperation,
	SchemaVersionId,
	TableIndex,
	TransactionType
} from '@airport/ground-control'
import {Service} from "typedi";
import {Inject}  from "typedi/decorators/Inject";
import {
	ActorId,
	RecordHistoryActorRecordId,
	RepositoryEntityActorRecordId,
	RepositoryId,
	RepositoryTransactionHistoryId
}                from "../../ddl/ddl";
import {
	IOperationHistoryDmo,
	IRecordHistoryDmo,
}                from "../../dmo/dmo";
import {
	BaseRepositoryTransactionHistoryDao,
	IOperationHistory,
	IRepositoryTransactionHistory,
	Q,
	QActor,
	QOperationHistory,
	QRecordHistory,
	QRecordHistoryNewValue,
	QRepository,
	QRepositoryTransactionHistory,
	QTransactionHistory,
	RepositoryTransactionHistoryESelect
}                from "../../generated/generated";
import {
	OperationHistoryDmoToken,
	RecordHistoryDmoToken,
	RepositoryTransactionHistoryDaoToken,
}                from "../../InjectionTokens";

export interface IRepositoryTransactionHistoryDao {

	getSelectClauseWithRecordHistory(): RepositoryTransactionHistoryESelect;

	findWhere(
		whereClauseFunction: {
			(
				rth: QRepositoryTransactionHistory,
				r: QRepository,
				oh?: QOperationHistory,
				rh?: QRecordHistory,
				rhnv?: QRecordHistoryNewValue
			): JSONLogicalOperation
		}
	): Promise<IRepositoryTransactionHistory[]>;

	findWhereIdsIn(
		idsInClause: RepositoryTransactionHistoryId[]
			| RawFieldQuery<IQNumberField>
			| {
			(...args: any[]): RawFieldQuery<IQNumberField>
		}
	): Promise<IRepositoryTransactionHistory[]>;

	findExistingRecordIdMap(
		recordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
	): Promise<Map<RepositoryId, Map<SchemaVersionId,
		Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>>;

	// updateSyncStatusHistory(
	// 	syncStatus: SyncStatus,
	// 	repoTransHistoryIds: RepositoryTransactionHistoryId[]
	// ): Promise<void>;

	findAllLocalChangesForRecordIds(
		changedRecordIds: Map<RepositoryId, IChangedRecordIdsForRepository>
	): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>>;

}

export interface IChangedRecordIdsForRepository {
	ids: Map<SchemaVersionId, Map<EntityId,
		Map<ActorId, Set<RecordHistoryActorRecordId>>>>;
	firstChangeTime: Date;
}


@Service(RepositoryTransactionHistoryDaoToken)
export class RepositoryTransactionHistoryDao
	extends BaseRepositoryTransactionHistoryDao
	implements IRepositoryTransactionHistoryDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(OperationHistoryDmoToken)
		private operationHistoryDmo: IOperationHistoryDmo,
		@Inject(RecordHistoryDmoToken)
		private recordHistoryDmo: IRecordHistoryDmo,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	getSelectClauseWithRecordHistory(): RepositoryTransactionHistoryESelect {
		const id = Y;
		return {
			id,
			actor: {
				id
			},
			repository: {
				id
			},
			operationHistory: {
				...this.operationHistoryDmo.getAllFieldsSelect(),
				schemaVersion: {
					id: Y
				},
				entity: {
					index: Y
				},
				recordHistory: {
					...this.recordHistoryDmo.getAllFieldsSelect()
				}
			},
		};
	}

	async findWhere(
		whereClauseFunction: {
			(
				rth: QRepositoryTransactionHistory,
				r: QRepository,
				oh?: QOperationHistory,
				rh?: QRecordHistory,
			): JSONBaseOperation
		}
	): Promise<IRepositoryTransactionHistory[]> {
		let rth: QRepositoryTransactionHistory,
			r: QRepository,
			oh: QOperationHistory,
			rh: QRecordHistory;
		const id = Y;
		return await this.db.find.tree({
			select: this.getSelectClauseWithRecordHistory(),
			from: [
				rth = Q.RepositoryTransactionHistory,
				oh = rth.operationHistory.innerJoin(),
				rh = oh.recordHistory.innerJoin(),
			],
			where: whereClauseFunction(rth, r, oh, rh)
		});
	}

	async findWhereIdsIn(
		idsInClause: RepositoryTransactionHistoryId[]
			| RawFieldQuery<IQNumberField>
			| {
			(...args: any[]): RawFieldQuery<IQNumberField>
		},
	): Promise<IRepositoryTransactionHistory[]> {
		return await this.findWhere((
			rth: QRepositoryTransactionHistory
		) => rth.id.in(idsInClause));
	}


	async findWithActorAndRepositoryWhere(
		whereClauseFunction: {
			(
				rth: QRepositoryTransactionHistory,
				a: QActor,
				r: QRepository,
			): JSONBaseOperation
		}
	): Promise<IRepositoryTransactionHistory[]> {
		let rth: QRepositoryTransactionHistory,
			a: QActor,
			r: QRepository;
		return await this.db.find.graph({
			select: {
				...this.db.dmo.getAllFieldsSelect(),
				actor: {
					user: {},
					database: {},
				},
				repository: {
					orderedId: Y,
					randomId: Y,
					actor: {}
				},
				transactionHistory: {
					id: Y
				}
			},
			from: [
				rth = Q.RepositoryTransactionHistory,
				a = rth.actor.innerJoin(),
				r = rth.repository.innerJoin(),
			],
			where: whereClauseFunction(rth, a, r)
		});
	}

	async findWithActorAndRepositoryWherIdsIn(
		idsInClause: RepositoryTransactionHistoryId[]
			| RawFieldQuery<IQNumberField>
			| {
			(...args: any[]): RawFieldQuery<IQNumberField>
		}
	): Promise<IRepositoryTransactionHistory[]> {
		return await this.findWithActorAndRepositoryWhere((
			rth
		) => rth.id.in(idsInClause));
	}

	async findAllLocalChangesForRecordIds(
		changedRecordIds: Map<RepositoryId, IChangedRecordIdsForRepository>
	): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>> {
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
			= new Map();

		const trafficPatternQSchema = this.airportDb.qSchemaMapByName['@airport/traffic-pattern'];

		const rth: QRepositoryTransactionHistory = Q.RepositoryTransactionHistory;
		const th: QTransactionHistory = rth.transactionHistory.innerJoin();
		const oh: QOperationHistory = rth.operationHistory.leftJoin();
		const rh: QRecordHistory = oh.recordHistory.leftJoin();
		const nv: QRecordHistoryNewValue = rh.newValues.leftJoin();
		let id = Y;

		const repositoryEquals: JSONBaseOperation[] = [];
		for (const [repositoryId, idsForRepository] of changedRecordIds) {
			const recordMapForRepository = idsForRepository.ids;
			const schemaEquals: JSONBaseOperation[] = [];
			for (const [schemaVersionId, recordMapForSchema] of recordMapForRepository) {
				const entityEquals: JSONBaseOperation[] = [];
				for (const [entityId, recordMapForEntity] of recordMapForSchema) {
					const actorEquals: JSONBaseOperation[] = [];
					for (const [actorId, recordsForActor] of recordMapForEntity) {
						actorEquals.push(and(
							rh.actor.id.equals(actorId),
							rh.actorRecordId.in(Array.from(recordsForActor))
						))
					}
					entityEquals.push(and(
						oh.entity.id.equals(entityId),
						or(...actorEquals)
					));
				}
				const sv = trafficPatternQSchema.SchemaVersion;
				schemaEquals.push(and(
					oh.schemaVersion.id.in(field({
						from: [
							sv
						],
						select: sv.id,
						where: sv.id.equals(schemaVersionId)
					})),
					or(...entityEquals)
				));
			}
			repositoryEquals.push(and(
				rth.repository.id.equals(repositoryId),
				rth.saveTimestamp.greaterThanOrEquals(idsForRepository.firstChangeTime),
				or(...schemaEquals)
			))
		}

		const repoTransHistories = await this.db.find.tree({
			select: {
				actor: {
					id
				},
				repository: {
					id
				},
				saveTimestamp: Y,
				operationHistory: {
					orderNumber: Y,
					changeType: Y,
					schema: {
						index: Y
					},
					entity: {
						index: Y
					},
					recordHistory: {
						newValues: {
							columnIndex: Y,
							newValue: Y
						}
					}
				}
			},
			from: [
				th,
				rth,
				oh,
				rh,
				nv

			],
			where: and(
				th.transactionType.equals(TransactionType.LOCAL),
				or(...repositoryEquals)
			),
			orderBy: [
				rth.repository.id.asc(),
				oh.orderNumber.desc()
			]
		});

		for (const repoTransHistory of repoTransHistories) {
			this.utils.ensureChildArray(
				repoTransHistoryMapByRepositoryId, repoTransHistory.repository.id)
				.push(repoTransHistory);
			repoTransHistory.operationHistory.sort((
				rth1: IOperationHistory,
				rth2: IOperationHistory
			) => {
				if (rth1.orderNumber < rth2.orderNumber) {
					return -1;
				}
				if (rth1.orderNumber > rth2.orderNumber) {
					return 1;
				}
				return 0;
			});
		}

		return repoTransHistoryMapByRepositoryId;
	}

	async findExistingRecordIdMap(
		recordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
	): Promise<Map<RepositoryId, Map<SchemaVersionId,
		Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>> {
		const existingRecordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= new Map();

		const rth = Q.RepositoryTransactionHistory,
			oh = rth.operationHistory.innerJoin(),
			rh = oh.recordHistory.innerJoin();

		const idsFragments: JSONBaseOperation[] = [];
		for (const [repositoryId, recordIdMapForRepository] of recordIdMap) {
			let schemaFragments: JSONBaseOperation[] = [];
			for (const [schemaVersionId, recordIdMapForSchemaInRepository]
				of recordIdMapForRepository) {
				let tableFragments: JSONBaseOperation[] = [];
				for (const [entityId, recordIdMapForTableInRepository]
					of recordIdMapForSchemaInRepository) {

					let actorIdsFragments: JSONBaseOperation[] = [];
					for (const [actorId, recordIdSetForActor] of recordIdMapForTableInRepository) {
						actorIdsFragments.push(and(
							rh.actor.id.equals(actorId),
							rh.actorRecordId.in(Array.from(recordIdSetForActor))
						))
					}
					tableFragments.push(and(
						oh.entity.id.equals(entityId),
						or(...actorIdsFragments)
					));
				}
				schemaFragments.push(and(
					oh.schemaVersion.id.equals(schemaVersionId),
					or(...tableFragments)
				));
			}
			idsFragments.push(and(
				rth.repository.id.equals(repositoryId),
				oh.changeType.equals(ChangeType.INSERT_VALUES),
				or(...schemaFragments)
			));
		}

		const records = await this.airportDb.find.sheet({
			from: [
				rth,
				oh,
				rh
			],
			select: distinct([
				rth.repository.id,
				oh.schemaVersion.id,
				oh.entity.id,
				rh.actor.id,
				rh.actorRecordId
			]),
			where: or(...idsFragments)
		});

		for (const record of records) {
			this.utils.ensureChildJsSet(
				this.utils.ensureChildJsMap(
					this.utils.ensureChildJsMap(
						this.utils.ensureChildJsMap(existingRecordIdMap, record[0]),
						record[1]), record[2]), record[3]
			).add(record[4]);
		}

		return existingRecordIdMap;
	}

}