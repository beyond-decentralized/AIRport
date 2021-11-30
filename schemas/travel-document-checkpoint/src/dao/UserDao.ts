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

	insert(
		users: IUser[]
	): Promise<void>

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

	async insert(
		users: IUser[]
	): Promise<void> {
		let u: QUser;
		const values = []
		for (const user of users) {
			values.push([
				user.uuId, user.username
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: u = Q.User,
			columns: [
				u.uuId,
				u.username
			],
			values
		})
	}

}

DI.set(USER_DAO, UserDao)
