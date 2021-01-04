import { DI, IContext } from '@airport/di';
import {TRANSACTION_MANAGER} from '@airport/terminal-map'
import {ITransaction}        from './ITransaction'

/**
 * Created by Papa on 4/3/2019.
 */

// NOTE removed manually exposted transactional tools
// this better supports WebSql

// export async function transact(): Promise<ITransaction> {
// 	const transactionManager = await DI.db()
// 		.get(TRANSACTION_MANAGER)
// 	return await transactionManager.transact({
// 		domainAndPort: 'any'
// 	})
// }
//
// export async function commit(
// 	transaction: ITransaction
// ): Promise<void> {
// 	const transactionManager = await DI.db()
// 		.get(TRANSACTION_MANAGER)
// 	await transactionManager.commit(transaction)
// }
//
// export async function rollback(
// 	transaction: ITransaction
// ): Promise<void> {
// 	const transactionManager = await DI.db()
// 		.get(TRANSACTION_MANAGER)
// 	await transactionManager.rollback(transaction)
// }

// *
//  * One transaction execution to one at a time, so a way to track existing
//  * transactional context is required.  Zone.js can be used as a thread local context for
//  * that.
export async function transactional<T>(
	callback: {
		(
			transaction: ITransaction
		): Promise<void>
	},
	context: IContext = {},
): Promise<void> {
	const transactionManager = await DI.db()
		.get(TRANSACTION_MANAGER)
	await transactionManager.transact({
		domainAndPort: 'any'
	}, callback, context)
}
