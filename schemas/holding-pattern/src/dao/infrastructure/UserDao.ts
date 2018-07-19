import {UtilsToken} from "@airport/air-control/lib/InjectionTokens";
import {IUtils} from "@airport/air-control/lib/lingo/utils/Utils";
import {Inject} from "typedi/decorators/Inject";
import {Service} from "typedi/decorators/Service";
import {UserUniqueId} from "../../ddl/ddl";
import {BaseUserDao, IBaseUserDao, IUser, Q, QUser, UserESelect} from "../../generated/generated";
import {UserDaoToken} from "../../InjectionTokens";

export interface IUserDao
	extends IBaseUserDao {

	findMapByUniqueId(
		userUniqueIds: UserUniqueId[]
	): Promise<Map<UserUniqueId, IUser>>;

	findFieldsMapByUniqueId(
		userUniqueIds: UserUniqueId[],
		select: UserESelect
	): Promise<Map<UserUniqueId, IUser>>;

	findByUniqueId(
		userUniqueIds: UserUniqueId[]
	): Promise<IUser[]>;

	findFieldsByUniqueId(
		userUniqueIds: UserUniqueId[],
		select: UserESelect
	): Promise<IUser[]>;

}

@Service(UserDaoToken)
export class UserDao
	extends BaseUserDao
	implements IUserDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils);
	}

	async findMapByUniqueId(
		userUniqueIds: UserUniqueId[]
	): Promise<Map<UserUniqueId, IUser>> {
		return await this.findFieldsMapByUniqueId(userUniqueIds, {});
	}

	async findFieldsMapByUniqueId(
		userUniqueIds: UserUniqueId[],
		select: UserESelect
	): Promise<Map<UserUniqueId, IUser>> {
		const userMap: Map<UserUniqueId, IUser> = new Map();

		const users = await this.findFieldsByUniqueId(userUniqueIds, {});
		for (const user of users) {
			userMap.set(user.uniqueId, user);
		}

		return userMap;
	}

	async findByUniqueId(
		uniqueIds: UserUniqueId[]
	): Promise<IUser[]> {
		return await this.findFieldsByUniqueId(uniqueIds, {});
	}

	async findFieldsByUniqueId(
		uniqueIds: UserUniqueId[],
		select: UserESelect
	): Promise<IUser[]> {
		let u: QUser;
		return await this.db.find.tree({
			select,
			from: [
				u = Q.User
			],
			where: u.uniqueId.in(uniqueIds)
		});
	}

}