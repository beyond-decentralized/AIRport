import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/tarmaq-query'

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
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity> {

	SELECT: IFieldsSelect<EntitySelect>

	getLocalIdStub(
		_localIds: number | string | number[] | string[]
	): ApplicationEntity_LocalId;

	getLocalIdStubs(
		_localIds: number[] | string[] | number[][] | string[][]
	): ApplicationEntity_LocalId[];

	/*
	getAllFieldsSelect(): EntitySelect;

	getIdFieldsSelect(): ApplicationEntity_LocalId;

	getNonIdFieldsSelect(): EntityUpdate;

	getAllManyToOnesSelect(): EntitySelect;

	getAllManyToOneIdStubsSelect(): EntitySelect;

	getAllOneToManysSelect(): EntitySelect;
	 */

}
