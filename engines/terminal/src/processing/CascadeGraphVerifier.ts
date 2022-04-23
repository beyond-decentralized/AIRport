import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import {
	ICascadeGraphVerifier,
	IOperationContext
} from '@airport/terminal-map'
import { CASCADE_GRAPH_VERIFIER } from '../tokens'

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

DEPENDENCY_INJECTION.set(CASCADE_GRAPH_VERIFIER, CascadeGraphVerifier)
