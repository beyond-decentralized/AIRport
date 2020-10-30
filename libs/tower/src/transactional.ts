import {DI}                  from '@airport/di'
import {ITransaction,}       from '@airport/ground-control'
import {TRANSACTION_MANAGER} from '@airport/terminal-map'

/**
 * Created by Papa on 4/3/2019.
 */


export async function transact(): Promise<ITransaction> {
	const transactionManager = await DI.db().get(TRANSACTION_MANAGER)
	return await transactionManager.transact({
		domainAndPort: 'any'
	})
}

export async function commit(
	transaction: ITransaction
): Promise<void> {
	const transactionManager = await DI.db().get(TRANSACTION_MANAGER)
	await transactionManager.commit(transaction)
}

export async function rollback(
	transaction: ITransaction
): Promise<void> {
	const transactionManager = await DI.db().get(TRANSACTION_MANAGER)
	await transactionManager.rollback(transaction)
}

// *
//  * One transaction execution to one at a time, so a way to track existing
//  * transactional context is required.  Zone.js can be used as a thread local context for
//  * that.
export async function transactional<T>(
	callback: (
		transaction: ITransaction
	) => Promise<T>,
	keepAlive?: boolean
): Promise<T> {
	let transaction
	try {
		transaction = await transact()
		const returnValue = await callback(transaction)
		await commit(transaction)

		return returnValue
	} catch (e) {
		try {
			if (transaction) {
				await rollback(transaction)
			}
		} catch (rollbackError) {
			// do nothing - no need to report the rollback error, since it was the
			// error that causes a rollback
		} finally {
			throw e
		}
	}
}
