import { UserAccount_LocalId, UserAccount_PublicSigningKey, UserAccount_Username } from '@airport/aviation-communication'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import { Dictionary, ISequenceGenerator, IUserAccount } from '@airport/ground-control'
import { BaseUserAccountDao, IBaseUserAccountDao } from '../generated/baseDaos'
import { QUserAccount } from '../generated/qInterfaces'

export interface IUserAccountDao
	extends IBaseUserAccountDao {

	findByUserAccountNames(
		usernames: UserAccount_Username[],
		context: IContext
	): Promise<IUserAccount[]>

	findByAccountPublicSingingKeys(
		accountPublicSingingKeys: UserAccount_PublicSigningKey[],
		context: IContext
	): Promise<IUserAccount[]>

	findByLocalIds(
		localIds: UserAccount_LocalId[],
		context: IContext
	): Promise<IUserAccount[]>

	insert(
		userAccounts: IUserAccount[],
		context: IContext
	): Promise<void>

}

@Injected()
export class UserAccountDao
	extends BaseUserAccountDao
	implements IUserAccountDao {

	@Inject()
	dictionary: Dictionary

	@Inject()
	sequenceGenerator: ISequenceGenerator

	async findByUserAccountNames(
		usernames: UserAccount_Username[],
		context: IContext
	): Promise<IUserAccount[]> {
		let u: QUserAccount
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				u = this.qSchema.UserAccount
			],
			WHERE: u.username.IN(usernames)
		}, context)
	}

	async findByAccountPublicSingingKeys(
		accountPublicSingingKeys: UserAccount_PublicSigningKey[],
		context: IContext
	): Promise<IUserAccount[]> {
		let u: QUserAccount
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				u = this.qSchema.UserAccount
			],
			WHERE: u.accountPublicSigningKey.IN(accountPublicSingingKeys)
		}, context)
	}

	async findByLocalIds(
		localIds: UserAccount_LocalId[],
		context: IContext
	): Promise<IUserAccount[]> {
		let u: QUserAccount

		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				u = this.qSchema.UserAccount
			],
			WHERE: u._localId.IN(localIds)
		}, context)
	}

	async insert(
		userAccounts: IUserAccount[],
		context: IContext
	): Promise<void> {
		const VALUES = []
		for (let i = 0; i < userAccounts.length; i++) {
			const userAccount = userAccounts[i]
			VALUES.push([
				userAccount.accountPublicSigningKey,
				userAccount.username,
				userAccount.sha1sum
			])
		}

		let u: QUserAccount
		const ids = await this.db.insertValuesGenerateIds({
			INSERT_INTO: u = this.qSchema.UserAccount,
			columns: [
				u.accountPublicSigningKey,
				u.username,
				u.sha1sum
			],
			VALUES
		}, context) as number[]

		for (let i = 0; i < userAccounts.length; i++) {
			const userAccount = userAccounts[i]
			userAccount._localId = ids[i][0]
		}
	}

}
