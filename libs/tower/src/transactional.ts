import {DI}              from '@airport/di'
import {TRANS_CONNECTOR} from '@airport/ground-control'

/**
 * Created by Papa on 4/3/2019.
 */

export function transact(): Promise<void> {
	return DI.get(TRANS_CONNECTOR).then(
		transConnector =>
			transConnector.transact()
	)
}

export function commit(): Promise<void> {
	return DI.get(TRANS_CONNECTOR).then(
		transConnector =>
			transConnector.commit()
	)
}

export function rollback(): Promise<void> {
	return DI.get(TRANS_CONNECTOR).then(
		transConnector =>
			transConnector.rollback()
	)
}

/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
export function transactional<T>(
	callback: () => Promise<T>,
	keepAlive?: boolean
): Promise<T> {
	let transactionStarted = false
	let transactionalConnector
	let result

	return DI.get(TRANS_CONNECTOR).then(
		transConnector => {
			transactionalConnector = transConnector
			return transConnector.transact()
		}).then(
		_ => {
			transactionStarted = true
			return callback()
		}).then(
		returnValue => {
			result = returnValue
			return transactionalConnector.commit()

		}).then(
		_ => result)
		.catch(
			e => {
				if (transactionStarted) {
					return
				}
				return transactionalConnector.rollback()
					.then()
					.catch(
						_ => {
							// do nothing - no need to report the rollback error, since it was the
							// error that causes a rollback
						}).then(
						_ => {
							throw e
						})
			})
}
