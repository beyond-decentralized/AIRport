import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { OPERATION_CONTEXT_LOADER } from '@airport/ground-control';
export class OperationContextLoader {
    async ensure(context) {
    }
    ensureSync(context) {
    }
}
DEPENDENCY_INJECTION.set(OPERATION_CONTEXT_LOADER, OperationContextLoader);
//# sourceMappingURL=OperationContext.js.map