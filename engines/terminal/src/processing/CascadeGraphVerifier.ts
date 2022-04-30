import { Injected } from '@airport/air-control'
import {
	ICascadeGraphVerifier,
	IOperationContext
} from '@airport/terminal-map'

@Injected()
export class CascadeGraphVerifier
	implements ICascadeGraphVerifier {

	verify<E, EntityCascadeGraph>(
		root: E | E[],
		context: IOperationContext,
	): E[] {
		if (!(root instanceof Array)) {
			root = [root]
		}
		// TODO: validate the rules specified in the graph
		// The graph will be defined via a @Save({
		//	...RULES
		//})
		// decorator

		return root
	}
}
