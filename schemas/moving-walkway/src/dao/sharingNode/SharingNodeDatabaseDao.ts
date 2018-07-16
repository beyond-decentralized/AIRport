import {
	and,
	IUtils,
	UtilsToken
} from "@airport/air-control";
import {DatabaseId}                  from "@airport/holding-pattern";
import {
	Inject,
	Service
} from "typedi";
import {SharingNodeId}               from "../../ddl/ddl";
import {
	BaseSharingNodeDatabaseDao,
	IBaseSharingNodeDatabaseDao,
	ISharingNodeDatabase,
	Q,
	QSharingNodeDatabase
}                                    from "../../generated/generated";
import {SharingNodeDatabaseDaoToken} from "../../InjectionTokens";

export interface ISharingNodeDatabaseDao
	extends IBaseSharingNodeDatabaseDao {

	findBySharingNodeDbMapByDatabaseIdAndSharingNodeIds(
		databaseId: DatabaseId,
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, ISharingNodeDatabase>>;

}

@Service(SharingNodeDatabaseDaoToken)
export class SharingNodeDatabaseDao
	extends BaseSharingNodeDatabaseDao
	implements ISharingNodeDatabaseDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findBySharingNodeDbMapByDatabaseIdAndSharingNodeIds(
		databaseId: DatabaseId,
		sharingNodeIds: SharingNodeId[]
	): Promise<Map<SharingNodeId, ISharingNodeDatabase>> {
		const sharingNodeDbMapBySharingNodeId: Map<SharingNodeId, ISharingNodeDatabase> = new Map();

		let snd: QSharingNodeDatabase;
		const sharingNodeDbs = await this.db.find.tree({
			select: {},
			from: [snd = Q.SharingNodeDatabase],
			where: and(
				snd.database.id.equals(databaseId),
				snd.sharingNode.id.in(sharingNodeIds)
			)
		});

		for (const sharingNodeDb of sharingNodeDbs) {
			sharingNodeDbMapBySharingNodeId.set(sharingNodeDb.sharingNode.id, sharingNodeDb);
		}

		return sharingNodeDbMapBySharingNodeId;
	}

}