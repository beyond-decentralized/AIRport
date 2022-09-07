import { IContext, Injected } from '@airport/direction-indicator'
import {
	UserAccount_GUID,
	UserAccount_UserAccountname
} from '../ddl/ddl'
import {
	BaseUserAccountDao,
	IBaseUserAccountDao,
	IUserAccount,
	QUserAccount,
} from '../generated/generated'
import Q from '../generated/qApplication'

export interface IUserAccountDao
	extends IBaseUserAccountDao {

	findByUserAccountNames(
		usernames: UserAccount_UserAccountname[]
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

	async findByUserAccountNames(
		usernames: UserAccount_UserAccountname[]
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
		let u: QUserAccount;
		const VALUES = []
		for (const userAccount of userAccounts) {
			VALUES.push([
				userAccount.GUID, userAccount.username
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			INSERT_INTO: u = Q.UserAccount,
			columns: [
				u.GUID,
				u.username
			],
			VALUES
		}, context) as number[][]
		for (let i = 0; i < userAccounts.length; i++) {
			const userAccount = userAccounts[i]
			userAccount._localId = _localIds[i][0]
		}
	}

}
