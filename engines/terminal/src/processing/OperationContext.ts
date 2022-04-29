import {
	DEPENDENCY_INJECTION
} from '@airport/direction-indicator'
import {
	IOperationContextLoader,
	OPERATION_CONTEXT_LOADER
} from '@airport/ground-control'
import {
	IOperationContext
} from '@airport/terminal-map'

export class OperationContextLoader
	implements IOperationContextLoader {

	async ensure(
		context: IOperationContext
	): Promise<void> {
	}

	ensureSync(
		context: IOperationContext
	): void {
	}

}
DEPENDENCY_INJECTION.set(OPERATION_CONTEXT_LOADER, OperationContextLoader)
