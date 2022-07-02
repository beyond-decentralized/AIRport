import { IContext, Injected } from '@airport/direction-indicator'
import {
	User_GUID,
	User_Username
} from '../ddl/ddl'
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

	findByGUIDs(
		GUIDs: User_GUID[]
	): Promise<IUser[]>

	insert(
		users: IUser[],
		context: IContext
	): Promise<void>

}

@Injected()
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

	async findByGUIDs(
		GUIDs: User_GUID[]
	): Promise<IUser[]> {
		let u: QUser
		return await this.db.find.tree({
			select: {},
			from: [
				u = Q.User
			],
			where: u.GUID.in(GUIDs)
		})
	}

	async insert(
		users: IUser[],
		context: IContext
	): Promise<void> {
		let u: QUser;
		const values = []
		for (const user of users) {
			values.push([
				user.GUID, user.username
			])
		}
		const ids = await this.db.insertValuesGenerateIds({
			insertInto: u = Q.User,
			columns: [
				u.GUID,
				u.username
			],
			values
		}, context) as number[][]
		for (let i = 0; i < users.length; i++) {
			const user = users[i]
			user.id = ids[i][0]
		}
	}

}
