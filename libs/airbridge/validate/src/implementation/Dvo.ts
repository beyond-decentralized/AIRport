import { QApplication } from '@airport/aviation-communication'
import {
  IEntityCascadeGraph,
  IEntityCreateProperties,
  IEntityIdProperties,
  IEntitySelectProperties,
  IEntityUpdateColumns,
  IEntityUpdateProperties,
  IQEntity,
} from '@airport/tarmaq-query';
import {
  DbEntity,
  ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import { IDvo } from '../definition/IDvo';

/**
 * Data Validation object.
 */
export class Dvo<Entity,
  EntitySelect extends IEntitySelectProperties,
  EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
  EntityUpdate extends IEntityUpdateProperties,
  ApplicationEntity_LocalId extends IEntityIdProperties,
  EntityCascadeGraph extends IEntityCascadeGraph,
  IQE extends IQEntity>
  implements IDvo<Entity, EntitySelect, EntityCreate,
  EntityUpdateColumns, EntityUpdate, ApplicationEntity_LocalId,
  EntityCascadeGraph, IQE> {

  private dbEntity: DbEntity;

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
    rules: any
  ): Promise<boolean> {
    return null
  }

}
