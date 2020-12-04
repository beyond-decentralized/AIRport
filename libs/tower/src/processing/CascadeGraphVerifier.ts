import {DI}                     from '@airport/di'
import {CASCADE_GRAPH_VERIFIER} from '../tokens'
import {IOperationContext}      from './OperationContext'

export interface ICascadeGraphVerifier {

	verify<E, EntityCascadeGraph>(
		entities: E | E[],
		context: IOperationContext<E, EntityCascadeGraph>,
	): E[]

}

export class CascadeGraphVerifier
	implements ICascadeGraphVerifier {

	verify<E, EntityCascadeGraph>(
		root: E | E[],
		context: IOperationContext<E, EntityCascadeGraph>,
	): E[] {
		if (!(root instanceof Array)) {
			root = [root]
		}
		throw new Error('Not implemented')
		// return root
	}
}

DI.set(CASCADE_GRAPH_VERIFIER, CascadeGraphVerifier)
