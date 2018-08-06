import {
	and,
	MappedEntityArray,
	Y
}                      from "@airport/air-control";
import {UtilsToken}    from "@airport/air-control/lib/InjectionTokens";
import {IQNumberField} from "@airport/air-control/lib/lingo/core/field/NumberField";
import {RawFieldQuery} from "@airport/air-control/lib/lingo/query/facade/FieldQuery";
import {IUtils}        from "@airport/air-control/lib/lingo/utils/Utils";
import {
	TerminalName,
	TerminalSecondId
}                      from '@airport/arrivals-n-departures'
import {Service}       from "typedi";
import {Inject}        from "typedi/decorators/Inject";
import {
	RepositoryId,
	UserUniqueId
}                      from "../../ddl/ddl";
import {
	BaseRepositoryDao,
	IRepository,
	Q,
	QTerminal,
	QRepository,
}                      from "../../generated/generated";
import {
	ActorRandomId,
	QActor,
	QRepositoryActor,
	QUser,
	RepositoryOrderedId,
	RepositoryRandomId,
	RepositoryTransactionHistoryId
}                      from "../../index";
import {RepositoryDaoToken} from "../../InjectionTokens";

export interface IRepositoryDao {

	findReposWithDetailsByIds(
		repositoryIdsInClause: RepositoryTransactionHistoryId[]
			| RawFieldQuery<IQNumberField>
			| {
			(...args: any[]): RawFieldQuery<IQNumberField>
		},
		dbName: TerminalName,
		userEmail: UserUniqueId,
	): Promise<MappedEntityArray<IRepository>>;

	findLocalRepoIdsByGlobalIds(
		orderedIds: RepositoryOrderedId[],
		randomIds: RepositoryRandomId[],
		ownerActorRandomIds: ActorRandomId[],
		ownerUserUniqueIds: UserUniqueId[],
		ownerTerminalNames: TerminalName[],
		ownerTerminalSecondIds: TerminalSecondId[],
		ownerTerminalOwnerUserUniqueIds: UserUniqueId[]
	): Promise<RepositoryIdMap>;

	findReposWithGlobalIds(
		repositoryIds: RepositoryId[]
	): Promise<Map<RepositoryId, IRepository>>;

}

export type RepositoryIdMap = Map<UserUniqueId,
	Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId,
		Map<ActorRandomId, Map<RepositoryOrderedId,
			Map<RepositoryRandomId, RepositoryId>>>>>>>;

@Service(RepositoryDaoToken)
export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findReposWithTransactionLogDetailsByIds(
		repositoryIds: RepositoryId[]
	): Promise<MappedEntityArray<IRepository>> {
		let r: QRepository;
		let ra: QRepositoryActor;
		let a: QActor;
		let u: QUser;
		let d: QTerminal;
		let id = Y;
		return await this.db.find.mapped.tree({
			select: {
				orderedId: Y,
				randomId: Y,
				ownerActor: {
					user: {
						id
					},
					terminal: {
						id
					}
				},
			},
			from: [
				r = Q.Repository,
				ra = r.repositoryActors.innerJoin(),
				a = ra.actor.innerJoin(),
				u = a.user.innerJoin(),
				d = a.terminal.innerJoin()
			],
			where:
			// and(
				r.id.in(repositoryIds),
			// d.name.equals(dbName),
			// u.uniqueId.equals(userEmail)
			// )
		});
	}

	async findReposWithDetailsAndSyncNodeIds(
		repositoryIds: RepositoryId[]
	): Promise<IRepository[]> {
		let r: QRepository;
		const id = Y;
		return await this.db.find.tree({
			select: {
				id,
				ownerActor: {
					id
				},
				orderedId: Y,
				randomId: Y
			},
			from: [
				r = Q.Repository
			],
			where: r.id.in(repositoryIds)
		});
	}

	async findReposWithDetailsByIds(
		repositoryIdsInClause: RepositoryTransactionHistoryId[]
			| RawFieldQuery<IQNumberField>
			| {
			(...args: any[]): RawFieldQuery<IQNumberField>
		},
		dbName: TerminalName,
		userEmail: UserUniqueId,
	): Promise<MappedEntityArray<IRepository>> {
		let r: QRepository;
		let ra: QRepositoryActor;
		let a: QActor;
		let u: QUser;
		let d: QTerminal;
		let id = Y;
		return await this.db.find.mapped.tree({
				select: {
					...this.db.dmo.getAllFieldsSelect(),
					repositoryActors: {
						actor: {
							user: {
								id
							},
							terminal: {
								id
							}
						}
					},
				},
				from: [
					r = Q.Repository,
					ra = r.repositoryActors.innerJoin(),
					a = ra.actor.innerJoin(),
					u = a.user.innerJoin(),
					d = a.terminal.innerJoin()
				],
				where: and(
					r.id.in(repositoryIdsInClause),
					d.name.equals(dbName),
					u.uniqueId.equals(userEmail)
				)
			}
		);
	}

	async findReposWithGlobalIds(
		repositoryIds: RepositoryId[]
	): Promise<Map<RepositoryId, IRepository>> {
		const repositoryMapById: Map<RepositoryId, IRepository>
			= new Map();

		let r: QRepository;
		let a: QActor;
		let u: QUser;
		const repositories = await this.db.find.tree({
			select: {
				id: Y,
				orderedId: Y,
				randomId: Y,
				ownerActor: {
					id: Y,
					user: {
						uniqueId: Y
					},
				}
			},
			from: [
				r = Q.Repository,
				a = r.ownerActor.innerJoin(),
				u = a.user.innerJoin()
			],
			where:
				r.id.in(repositoryIds)
		});

		for (const repository of repositories) {
			repositoryMapById.set(repository.id, repository);
		}

		return repositoryMapById;
	}

	async findLocalRepoIdsByGlobalIds(
		orderedIds: RepositoryOrderedId[],
		randomIds: RepositoryRandomId[],
		ownerActorRandomIds: ActorRandomId[],
		ownerUserUniqueIds: UserUniqueId[],
		ownerTerminalNames: TerminalName[],
		ownerTerminalSecondIds: TerminalSecondId[],
		ownerTerminalOwnerUserUniqueIds: UserUniqueId[]
	): Promise<RepositoryIdMap> {
		const repositoryIdMap: RepositoryIdMap = new Map();

		let r: QRepository;
		let oa: QActor;
		let od: QTerminal;
		let odu: QUser;
		let ou: QUser;
		const resultRows = await
			this.db.common.find.sheet({
				from: [
					r = Q.Repository,
					oa = r.ownerActor.innerJoin(),
					ou = oa.user.innerJoin(),
					od = oa.terminal.innerJoin(),
					odu = od.owner.innerJoin(),
				],
				select: [
					odu.uniqueId,
					od.name,
					od.secondId,
					ou.uniqueId,
					oa.randomId,
					r.orderedId,
					r.randomId,
					r.id,
				],
				where: and(
					r.orderedId.in(orderedIds),
					r.randomId.in(randomIds),
					oa.randomId.in(ownerActorRandomIds),
					ou.uniqueId.in(ownerUserUniqueIds),
					od.name.in(ownerTerminalNames),
					od.secondId.in(ownerTerminalSecondIds),
					odu.uniqueId.in(ownerTerminalOwnerUserUniqueIds)
				)
			});

		for (const resultRow of resultRows) {
			this.utils.ensureChildJsMap(
				this.utils.ensureChildJsMap(
					this.utils.ensureChildJsMap(
						this.utils.ensureChildJsMap(
							this.utils.ensureChildJsMap(
								this.utils.ensureChildJsMap(repositoryIdMap, resultRow[0]),
								resultRow[1]),
							resultRow[2]),
						resultRow[3]),
					resultRow[4]),
				resultRow[5]).set(resultRow[6], resultRow[7]);
		}


		return repositoryIdMap;
	}

}