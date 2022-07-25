import { QApplication } from '@airport/aviation-communication';
import { DbEntity, ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
import { IDvo } from '../definition/IDvo';
/**
 * Data Validation object.
 */
export declare class Dvo<Entity, EntityVDescriptor> implements IDvo<Entity, EntityVDescriptor> {
    protected dbEntity: DbEntity;
    constructor(dbEntityId: DbEntityId | DbEntity, qApplication?: QApplication);
    validate(entity: Entity, rules: EntityVDescriptor): Promise<boolean>;
}
//# sourceMappingURL=Dvo.d.ts.map