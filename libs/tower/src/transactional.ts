import {DI}              from '@airport/di'
import {TRANS_CONNECTOR} from '@airport/ground-control'

/**
 * Created by Papa on 4/3/2019.
 */

var transactionInProgress = false

export async function transact(): Promise<void> {
	const transConnector = await DI.db().get(TRANS_CONNECTOR)
	await transConnector.transact()
	transactionInProgress = true
}

export async function commit(): Promise<void> {
	if (!transactionInProgress) {
		throw new Error('Cannot commit - no transaction in progress')
	}
	try {
		const transConnector = await DI.db().get(TRANS_CONNECTOR)
		await transConnector.commit()
	} finally {
		transactionInProgress = false
	}
}

export async function rollback(): Promise<void> {
	if (!transactionInProgress) {
		throw new Error('Cannot rollback - no transaction in progress')
	}
	try {
		const transConnector = await DI.db().get(TRANS_CONNECTOR)
		await transConnector.rollback()
	} finally {
		transactionInProgress = false
	}
}

/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
export async function transactional<T>(
	callback: () => Promise<T>,
	keepAlive?: boolean
): Promise<T> {
	if (transactionInProgress) {
		await callback()
		return
	}
	const transConnector = await DI.db().get(TRANS_CONNECTOR)
	try {

		await transConnector.transact()
		transactionInProgress = true

		const returnValue = await callback()

		await transConnector.commit()

		return returnValue
	} catch (e) {
		try {
			if (transactionInProgress) {
				await transConnector.rollback()
			}
		} catch (rollbackError) {
			// do nothing - no need to report the rollback error, since it was the
			// error that causes a rollback
		} finally {
			throw e
		}
	} finally {
		transactionInProgress = false
	}

}
