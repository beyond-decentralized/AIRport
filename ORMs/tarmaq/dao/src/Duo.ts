import { QApplication } from '@airport/aviation-communication'
import {
  IDuo,
  IEntityCascadeGraph,
  IEntityCreateProperties,
  IEntityIdProperties,
  IEntitySelectProperties,
  IEntityUpdateColumns,
  IEntityUpdateProperties,
  IFieldsSelect,
  IQEntity,
  Y,
} from '@airport/air-traffic-control';
import { DbEntity, ApplicationEntity_LocalId as DbEntityId, EntityRelationType } from '@airport/ground-control';

/**
 * Created by Papa on 8/26/2017.
 */

class FieldsSelect<EntitySelect extends IEntitySelectProperties>
  implements IFieldsSelect<EntitySelect> {

  constructor(
    public dbEntity: DbEntity,
  ) {
  }

  get ids(): EntitySelect {
    const propertyNames = this.dbEntity.properties
      .filter(
        property => property.isId)
      .map(
        property => property.name);

    return this.getSelect(propertyNames, false);
  }

  get fields(): EntitySelect {
    const propertyNames = this.dbEntity.properties
      .filter(
        property => !property.relation || !property.relation.length)
      .map(
        property => property.name);

    return this.getSelect(propertyNames, false);
  }

  get manyToOnes(): EntitySelect {
    return this.getRelationSelect(EntityRelationType.MANY_TO_ONE);
  }

  get oneToManys(): EntitySelect {
    return this.getRelationSelect(EntityRelationType.ONE_TO_MANY);
  }

  private getRelationSelect(
    relationType: EntityRelationType,
  ): EntitySelect {
    const propertyNames = this.dbEntity.properties
      .filter(
        property => property.relation
          && property.relation.length
          && property.relation[0].relationType === relationType)
      .map(
        property => property.name);

    return this.getSelect(propertyNames, true);
  }

  private getSelect(
    propertyNames: string[],
    forRelations: boolean,
  ): EntitySelect {
    const selectFragment = {};

    for (const propertyName of propertyNames) {
      selectFragment[propertyName] = forRelations ? {} : Y;
    }

    return selectFragment as any;
  }

}

/**
 * Data Manipulation object.
 */
export class Duo<Entity,
  EntitySelect extends IEntitySelectProperties,
  EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
  EntityUpdate extends IEntityUpdateProperties,
  ApplicationEntity_LocalId extends IEntityIdProperties,
  EntityCascadeGraph extends IEntityCascadeGraph,
  IQE extends IQEntity>
  implements IDuo<Entity, EntitySelect, EntityCreate,
  EntityUpdateColumns, EntityUpdate, ApplicationEntity_LocalId,
  EntityCascadeGraph, IQE> {

  select: IFieldsSelect<EntitySelect>;

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
    this.select = new FieldsSelect(this.dbEntity);
  }

  getLocalIdStub(
    _localIds: number | string | number[] | string[],
  ): ApplicationEntity_LocalId {
    throw new Error(`Not Implemented.`);
  }

  getLocalIdStubs(
    _localIds: number[] | string[] | number[][] | string[][],
  ): ApplicationEntity_LocalId[] {
    throw new Error(`Not Implemented.`);
  }

  /*
  getAllFieldsSelect(): EntitySelect {
    throw new Error(`Not Implemented.`)
  }

  getIdFieldsSelect(): ApplicationEntity_LocalId {
    throw new Error(`Not Implemented.`)
  }

  getNonIdFieldsSelect(): EntityUpdate {
    throw new Error(`Not Implemented.`)
  }

  getMaxIdsSelectPerRepository() {
    throw new Error(`Not implemented`)
  }

  getMaxIdSelect() {
    throw new Error(`Not implemented`)
  }

  getAllManyToOnesSelect(): EntitySelect {
    throw new Error(`Not implemented`)
  }

  getAllManyToOneIdStubsSelect(): EntitySelect {
    throw new Error(`Not implemented`)
  }

  getAllOneToManysSelect(): EntitySelect {
    throw new Error(`Not implemented`)
  }
   */

}
