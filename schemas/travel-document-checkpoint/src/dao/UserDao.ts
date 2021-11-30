import { DI } from '@airport/di'
import {
	User_UuId,
	User_Username
} from '../ddl/ddl'
import { USER_DAO } from '../tokens'
import {
	BaseUserDao,
	IBaseUserDao,
	IUser,
	Q,
	QUser,
} from '../generated/generated'

export interface IUserDao
	extends IBaseUserDao {

	findByUserNames(
		usernames: User_Username[]
	): Promise<IUser[]>

	findByUuIds(
		uuIds: User_UuId[]
	): Promise<IUser[]>

}

export class UserDao
	extends BaseUserDao
	implements IUserDao {

	async findByUserNames(
		usernames: User_Username[]
	): Promise<IUser[]> {
		let u: QUser
		return await this.db.find.tree({
			select: {},
			from: [
				u = Q.User
			],
			where: u.username.in(usernames)
		})
	}

	async findByUuIds(
		uuIds: User_UuId[]
	): Promise<IUser[]> {
		let u: QUser
		return await this.db.find.tree({
			select: {},
			from: [
				u = Q.User
			],
			where: u.uuId.in(uuIds)
		})
	}

}

DI.set(USER_DAO, UserDao)
