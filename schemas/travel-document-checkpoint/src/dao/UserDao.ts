import { DI } from '@airport/di'
import {
	User_Email,
	User_PrivateId,
	User_PublicId,
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
import { or } from '@airport/air-control'

export interface IUserDao
	extends IBaseUserDao {

	findByEmailsOrUserNames(
		emails: User_Email[],
		usernames: User_Username[]
	): Promise<IUser[]>

	findByPrivateIds(
		privateIds: User_PrivateId[]
	): Promise<IUser[]>

	findByPublicIds(
		publicIds: User_PublicId[]
	): Promise<IUser[]>

}

export class UserDao
	extends BaseUserDao
	implements IUserDao {

	async findByEmailsOrUserNames(
		emails: User_Email[],
		usernames: User_Username[]
	): Promise<IUser[]> {
		let u: QUser
		return await this.db.find.tree({
			select: {},
			from: [
				u = Q.User
			],
			where: or(
				u.email.in(emails),
				u.username.in(usernames)
			)
		})
	}

	async findByPrivateIds(
		privateIds: User_PrivateId[]
	): Promise<IUser[]> {
		let u: QUser
		return await this.db.find.tree({
			select: {},
			from: [
				u = Q.User
			],
			where: u.privateId.in(privateIds)
		})
	}

	async findByPublicIds(
		publicIds: User_PublicId[]
	): Promise<IUser[]> {
		let u: QUser
		return await this.db.find.tree({
			select: {},
			from: [
				u = Q.User
			],
			where: u.publicId.in(publicIds)
		})
	}

}

DI.set(USER_DAO, UserDao)
