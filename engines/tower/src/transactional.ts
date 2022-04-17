import { DI, IContext } from '@airport/di';
import {
	INTERNAL_APP,
	INTERNAL_DOMAIN
} from '@airport/ground-control';
import {
	ITransaction,
	ITransactionContext,
	TRANSACTION_MANAGER
} from '@airport/terminal-map'

/**
 * Created by Papa on 4/3/2019.
 */

export async function transactional<T>(
	callback: {
		(
			transaction: ITransaction,
			context?: ITransactionContext
		): Promise<void> | void
	},
	context: IContext = {},
): Promise<void> {
	if (!context) {
		context = {}
	}
	const transactionManager = await DI.db()
		.get(TRANSACTION_MANAGER)
	await transactionManager.transact({
		application: INTERNAL_APP,
		domain: INTERNAL_DOMAIN
	}, callback, context)
}
