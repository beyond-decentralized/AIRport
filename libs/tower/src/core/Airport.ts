/**
 * TODO: add Zone.js thread local context
 */
export class Airport {

	private static nextGlobalTransactionId = 0;

	static startTransaction(
	):number {
		return ++Airport.nextGlobalTransactionId;
	}

	static commitTransaction(
		globalTransactionId: number
	) {
		throw `Implement!`;
	}

	static rollbackTransaction(
		globalTransactionId: number
	) {
		throw `Implement!`;
	}

}