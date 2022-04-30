import { Injected } from '@airport/air-control'
import {
	IOperationContextLoader
} from '@airport/ground-control'
import {
	IOperationContext
} from '@airport/terminal-map'

@Injected()
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
