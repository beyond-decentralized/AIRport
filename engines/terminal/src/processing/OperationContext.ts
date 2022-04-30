import {
	IOperationContextLoader
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
