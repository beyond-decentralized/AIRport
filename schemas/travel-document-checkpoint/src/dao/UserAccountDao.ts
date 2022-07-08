import { IContext, Injected } from '@airport/direction-indicator'
import {
	UserAccount_GUID,
	UserAccount_UserAccountname
} from '../ddl/ddl'
import {
	BaseUserAccountDao,
	IBaseUserAccountDao,
	IUserAccount,
	Q,
	QUserAccount,
} from '../generated/generated'

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
			select: {},
			from: [
				u = Q.UserAccount
			],
			where: u.username.in(usernames)
		})
	}

	async findByGUIDs(
		GUIDs: UserAccount_GUID[]
	): Promise<IUserAccount[]> {
		let u: QUserAccount
		return await this.db.find.tree({
			select: {},
			from: [
				u = Q.UserAccount
			],
			where: u.GUID.in(GUIDs)
		})
	}

	async insert(
		userAccounts: IUserAccount[],
		context: IContext
	): Promise<void> {
		let u: QUserAccount;
		const values = []
		for (const userAccount of userAccounts) {
			values.push([
				userAccount.GUID, userAccount.username
			])
		}
		const _localIds = await this.db.insertValuesGenerateIds({
			insertInto: u = Q.UserAccount,
			columns: [
				u.GUID,
				u.username
			],
			values
		}, context) as number[][]
		for (let i = 0; i < userAccounts.length; i++) {
			const userAccount = userAccounts[i]
			userAccount._localId = _localIds[i][0]
		}
	}

}
