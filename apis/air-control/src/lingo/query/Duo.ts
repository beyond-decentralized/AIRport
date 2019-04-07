import {
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from "../core/entity/Entity";

/**
 * Data Utility Object.
 */
export interface IDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdate extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity> {

	getIdStub(
		ids: number | string | number[] | string[]
	): EntityId;

	getIdStubs(
		ids: number[] | string[] | number[][] | string[][]
	): EntityId[];

	getAllFieldsSelect(): EntitySelect;

	getIdFieldsSelect(): EntityId;

	getNonIdFieldsSelect(): EntityUpdate;

	getAllManyToOnesSelect(): EntitySelect;

	getAllManyToOneIdStubsSelect(): EntitySelect;

	getAllOneToManysSelect(): EntitySelect;

}
