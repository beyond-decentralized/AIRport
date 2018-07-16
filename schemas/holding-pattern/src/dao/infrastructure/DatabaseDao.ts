import {and}              from "@airport/air-control/lib/impl/core/operation/LogicalOperation";
import {UtilsToken}       from "@airport/air-control/lib/InjectionTokens";
import {IUtils}           from "@airport/air-control/lib/lingo/utils/Utils";
import {Inject}           from "typedi/decorators/Inject";
import {Service}          from "typedi/decorators/Service";
import {
	DatabaseName,
	DatabaseSecondId,
	UserId
}                         from "../../ddl/ddl";
import {
	BaseDatabaseDao,
	IBaseDatabaseDao,
	IDatabase,
	Q,
	QDatabase
}                         from "../../generated/generated";
import {DatabaseDaoToken} from "../../InjectionTokens";

export interface IDatabaseDao
	extends IBaseDatabaseDao {

	findMapByIds(
		ownerUniqueIds: UserId[],
		names: DatabaseName[],
		secondIds: DatabaseSecondId[]
	): Promise<Map<UserId, Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>>>;

	findByIds(
		ownerIds: UserId[],
		names: DatabaseName[],
		secondIds: DatabaseSecondId[]
	): Promise<IDatabase[]>;

}

@Service(DatabaseDaoToken)
export class DatabaseDao
	extends BaseDatabaseDao
	implements IDatabaseDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findMapByIds(
		ownerIds: UserId[],
		names: DatabaseName[],
		secondIds: DatabaseSecondId[]
	): Promise<Map<UserId, Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>>> {
		const databaseMap: Map<UserId,
			Map<DatabaseName, Map<DatabaseSecondId, IDatabase>>> = new Map();

		const databases = await this.findByIds(ownerIds, names, secondIds);
		for (const database of databases) {
			this.utils.ensureChildJsMap(
				this.utils.ensureChildJsMap(databaseMap,
					database.owner.id),
				database.name)
				.set(database.secondId, database);
		}

		return databaseMap;
	}

	async findByIds(
		ownerIds: UserId[],
		names: DatabaseName[],
		secondIds: DatabaseSecondId[]
	): Promise<IDatabase[]> {
		let d: QDatabase;
		return await this.db.find.tree({
			select: {},
			from: [
				d = Q.Database
			],
			where: and(
				d.owner.id.in(ownerIds),
				d.name.in(names),
				d.secondId.in(secondIds)
			)
		})
	}

}