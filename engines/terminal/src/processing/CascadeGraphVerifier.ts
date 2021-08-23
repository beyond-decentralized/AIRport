import { DI } from '@airport/di'
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

		return root
	}
}

DI.set(CASCADE_GRAPH_VERIFIER, CascadeGraphVerifier)
