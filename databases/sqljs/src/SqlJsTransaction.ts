import {
    IContext
} from '@airport/direction-indicator'
import { SqlTransaction } from '@airport/fuel-hydrant-system'

export class SqlJsTransaction
    extends SqlTransaction {

    isServer(
        context?: IContext,
    ): boolean {
        return false
    }

}