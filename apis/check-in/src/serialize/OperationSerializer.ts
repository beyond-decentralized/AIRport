import {DI}                   from '@airport/di'
import {OPERATION_SERIALIZER} from '../tokens'

export interface IOperationSerializer {

	serialize<E, T = E | E[]>(
		entity: T,
	): T

}

interface ISerializableOperation {
	lookupTable: any[]
	sequence: number
}

export class OperationSerializer
	implements IOperationSerializer {

	serialize<E, T = E | E[]>(
		entity: T,
	): T {
		const operation: ISerializableOperation = {
			lookupTable
		}
		// TODO: add support for non-create operations
		return null
	}

	doSerialize<E>(
		entity: E,
		operation: ISerializableOperation
	): E {
		return null
	}

}

DI.set(OPERATION_SERIALIZER, OperationSerializer)
