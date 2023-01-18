import { IUserAccount, UserAccount_GUID, UserAccount_Username } from '@airport/aviation-communication'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import { Dictionary, ISequenceGenerator } from '@airport/ground-control'
import {
	BaseUserAccountDao,
	IBaseUserAccountDao,
	QUserAccount,
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface IUserAccountDao
	extends IBaseUserAccountDao {

	findByUserAccountNames(
		usernames: UserAccount_Username[]
	): Promise<IUserAccount[]>

	findByGUIDs(
		GUIDs: UserAccount_GUID[]
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
		usernames: UserAccount_Username[]
	): Promise<IUserAccount[]> {
		let u: QUserAccount
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				u = Q.UserAccount
			],
			WHERE: u.username.IN(usernames)
		})
	}

	async findByGUIDs(
		GUIDs: UserAccount_GUID[]
	): Promise<IUserAccount[]> {
		let u: QUserAccount
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				u = Q.UserAccount
			],
			WHERE: u.GUID.IN(GUIDs)
		})
	}

	async insert(
		userAccounts: IUserAccount[],
		context: IContext
	): Promise<void> {
		const airport = this.dictionary.airport
		const UserAccount = this.dictionary.UserAccount
		const userAccountLids = await this.sequenceGenerator
			.generateSequenceNumbersForColumn(
				airport.DOMAIN_NAME,
				airport.apps.TRAVEL_DOCUMENT_CHECKPOINT.name,
				UserAccount.name,
				UserAccount.columns.USER_ACCOUNT_LID,
				userAccounts.length
			);

		const VALUES = []
		for (let i = 0; i < userAccounts.length; i++) {
			const userAccount = userAccounts[i]
			userAccount._localId = userAccountLids[i]
			VALUES.push([
				userAccountLids[i], userAccount.GUID, userAccount.username
			])
		}

		let u: QUserAccount
		await this.db.insertValues({
			INSERT_INTO: u = Q.UserAccount,
			columns: [
				u._localId,
				u.GUID,
				u.username
			],
			VALUES
		}, context)
	}

}
