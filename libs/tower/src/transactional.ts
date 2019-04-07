import {DI} from '@airport/di'
import {
	STORE_DRIVER
}           from '@airport/ground-control'

/**
 * Created by Papa on 4/3/2019.
 */

/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
export async function transactional<T>(
	callback: () => Promise<T>,
	keepAlive?: boolean
): Promise<T> {
	const storeDriver = await DI.getP(STORE_DRIVER)
	let transactionStarted          = false
	try {
		await storeDriver.transact(keepAlive)
		transactionStarted = true

		const returnValue = await callback()

		await storeDriver.commit()

		return returnValue
	} catch (e) {
		if (transactionStarted) {
			await storeDriver.rollback()
		}
		throw e
	}

}
