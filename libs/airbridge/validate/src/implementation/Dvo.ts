import { QApplication } from '@airport/aviation-communication'
import {
  DbEntity,
  ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import { IDvo } from '../definition/IDvo';

/**
 * Data Validation object.
 */
export class Dvo<Entity,
  EntityVDescriptor>
  implements IDvo<Entity, EntityVDescriptor> {

  protected dbEntity: DbEntity;

  constructor(
    dbEntityId: DbEntityId | DbEntity,
    qApplication?: QApplication,
  ) {
    if (typeof dbEntityId === 'number') {
      this.dbEntity = qApplication.__dbApplication__.currentVersion[0]
        .applicationVersion.entities[dbEntityId];
    } else {
      this.dbEntity = dbEntityId;
    }
  }

  async validate(
    entity: Entity,
    rules: EntityVDescriptor
  ): Promise<boolean> {
    return null
  }

}
