import {
	and,
	IUtils,
	UtilsToken,
	Y
}                          from "@airport/air-control";
import {JSONBaseOperation} from "@airport/ground-control";
import {
	Inject,
	Service
}                          from "typedi";
import {
	ActorId,
	ActorRandomId,
	DatabaseId,
	UserId
}                          from "../../ddl/ddl";
import {
	BaseActorDao,
	IActor,
	IBaseActorDao,
	Q,
	QActor,
	QUser
}                          from "../../generated/generated";
import {ActorDaoToken}     from "../../InjectionTokens";

export interface IActorDao extends IBaseActorDao {

	findWithDetailsAndGlobalIdsByIds(
		actorIds: ActorId[]
	): Promise<IActor[]>;

	findWithDetailsByGlobalIds(
		randomIds: ActorRandomId[],
		userIds: UserId[],
		databaseIds: DatabaseId[]
	): Promise<IActor[]>;

	findMapsWithDetailsByGlobalIds(
		randomIds: ActorRandomId[],
		userIds: UserId[],
		databaseIds: DatabaseId[],
		actorMap: Map<UserId, Map<DatabaseId, IActor>>,
		actorMapById: Map<ActorId, IActor>
	): Promise<void>;

}

@Service(ActorDaoToken)
export class ActorDao
	extends BaseActorDao
	implements IActorDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findWithDetailsAndGlobalIdsByIds(
		actorIds: ActorId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor,
		) => a.id.in(actorIds));
	}

	async findMapsWithDetailsByGlobalIds(
		randomIds: ActorRandomId[],
		userIds: UserId[],
		databaseIds: DatabaseId[],
		actorMap: Map<UserId, Map<DatabaseId, IActor>>,
		actorMapById: Map<ActorId, IActor>
	): Promise<void> {
		const actors = await this.findWithDetailsByGlobalIds(
			randomIds,
			userIds,
			databaseIds
		);

		for (const actor of actors) {
			this.utils.ensureChildJsMap(actorMap, actor.user.id)
				.set(actor.database.id, actor);
			actorMapById.set(actor.id, actor);
		}
	}

	async findWithDetailsByGlobalIds(
		randomIds: ActorRandomId[],
		userIds: UserId[],
		databaseIds: DatabaseId[]
	): Promise<IActor[]> {
		return await this.findWithDetailsAndGlobalIdsByWhereClause((
			a: QActor
		) => and(
			a.randomId.in(randomIds),
			a.database.id.in(databaseIds),
			a.user.id.in(userIds)
		));
	}

	private async findWithDetailsAndGlobalIdsByWhereClause(
		getWhereClause: (
			a: QActor
		) => JSONBaseOperation
	): Promise<IActor[]> {
		let a: QActor;
		let u: QUser;
		const id = Y;
		return await this.db.find.tree({
			select: {
				id,
				randomId: Y,
				user: {
					id,
				},
				database: {
					id
				}
			},
			from: [
				a = Q.Actor
			],
			where: getWhereClause(a)
		});
	}
}