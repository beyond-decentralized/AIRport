import {DI}                from '@airport/di'
import {IOperationContext} from './OperationContext'
import {ENTITY_VALIDATOR}  from './tokens'

export interface IEntityValidator {

	validate<E, EntityCascadeGraph>(
		entity: E,
		operatedOnEntityIndicator: boolean[],
		ctx: IOperationContext<E, EntityCascadeGraph>,
	): Promise<void>

}

export class EntityValidator {

	async validate<E, EntityCascadeGraph>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		context: IOperationContext<E, EntityCascadeGraph>,
	): Promise<void> {

		for (const entity of entities) {
			const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity)
			const entityOperatedOn  = !!operatedOnEntityIndicator[operationUniqueId]
			if (entityOperatedOn) {
				continue
			}
		}

	}
}

DI.set(ENTITY_VALIDATOR, EntityValidator)
