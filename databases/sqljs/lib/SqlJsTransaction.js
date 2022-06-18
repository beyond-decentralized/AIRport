import { SqlTransaction } from '@airport/fuel-hydrant-system';
export class SqlJsTransaction extends SqlTransaction {
    isServer(context) {
        return false;
    }
}
//# sourceMappingURL=SqlJsTransaction.js.map