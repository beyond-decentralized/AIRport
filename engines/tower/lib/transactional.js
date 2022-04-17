import { DI } from '@airport/di';
import { INTERNAL_APP, INTERNAL_DOMAIN } from '@airport/ground-control';
import { TRANSACTION_MANAGER } from '@airport/terminal-map';
/**
 * Created by Papa on 4/3/2019.
 */
export async function transactional(callback, context = {}) {
    if (!context) {
        context = {};
    }
    const transactionManager = await DI.db()
        .get(TRANSACTION_MANAGER);
    await transactionManager.transact({
        application: INTERNAL_APP,
        domain: INTERNAL_DOMAIN
    }, callback, context);
}
//# sourceMappingURL=transactional.js.map