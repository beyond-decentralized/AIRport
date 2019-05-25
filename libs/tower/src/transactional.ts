import {DI}              from '@airport/di'
import {TRANS_CONNECTOR} from '@airport/ground-control'

/**
 * Created by Papa on 4/3/2019.
 */

export async function transact(): Promise<void> {
	const transConnector = await DI.getP(TRANS_CONNECTOR)
	await transConnector.transact()
}

export async function commit(): Promise<void> {
	const transConnector = await DI.getP(TRANS_CONNECTOR)
	await transConnector.commit()
}

export async function rollback(): Promise<void> {
	const transConnector = await DI.getP(TRANS_CONNECTOR)
	await transConnector.rollback()
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
	const transConnector   = await DI.getP(TRANS_CONNECTOR)
	let transactionStarted = false
	try {
		await transConnector.transact()
		transactionStarted = true

		const returnValue = await callback()

		await transConnector.commit()

		return returnValue
	} catch (e) {
		try {
			if (transactionStarted) {
				await transConnector.rollback()
			}
		} catch (e) {
			// do nothing - no need to report the rollback error, since it was the
			// error that causes a rollback
		} finally {
			throw e
		}
	}

}
