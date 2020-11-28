import { DI } from '@airport/di';
import { ENTITY_VALIDATOR } from './tokens';
export class EntityValidator {
    async validate(entities, operatedOnEntityIndicator, context) {
        for (const entity of entities) {
            const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity);
            const entityOperatedOn = !!operatedOnEntityIndicator[operationUniqueId];
            if (entityOperatedOn) {
                continue;
            }
        }
    }
}
DI.set(ENTITY_VALIDATOR, EntityValidator);
//# sourceMappingURL=EntityValidator.js.map