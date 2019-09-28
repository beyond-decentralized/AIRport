import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '../core/entity/Entity'

/**
 * Select property creation utility
 */
export interface IFieldsSelect<EntitySelect extends IEntitySelectProperties> {

	ids: EntitySelect

	fields: EntitySelect

	manyToOnes: EntitySelect

	oneToManys: EntitySelect

}

/**
 * Data Utility Object.
 */
export interface IDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdate extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity> {

	select: IFieldsSelect<EntitySelect>

	getIdStub(
		ids: number | string | number[] | string[]
	): EntityId;

	getIdStubs(
		ids: number[] | string[] | number[][] | string[][]
	): EntityId[];

	/*
	getAllFieldsSelect(): EntitySelect;

	getIdFieldsSelect(): EntityId;

	getNonIdFieldsSelect(): EntityUpdate;

	getAllManyToOnesSelect(): EntitySelect;

	getAllManyToOneIdStubsSelect(): EntitySelect;

	getAllOneToManysSelect(): EntitySelect;
	 */

}
