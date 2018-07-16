import {
	DbEntity,
	IDmo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from "@airport/air-control";

/**
 * Created by Papa on 8/26/2017.
 */


/**
 * Data Manipulation object.
 */
export class Dmo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdate extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	implements IDmo<Entity, EntitySelect, EntityCreate, EntityUpdate, EntityId, IQE> {

	constructor(
		private dbEntity: DbEntity
	) {
	}

	getIdStub(
		ids: number | string | number[] | string[]
	): EntityId {
		throw `Not Implemented.`;
	}

	getIdStubs(
		ids: number[] | string[] | number[][] | string[][]
	): EntityId[] {
		throw `Not Implemented.`;
	}

	getAllFieldsSelect(): EntitySelect {
		throw `Not Implemented.`;
	}

	getIdFieldsSelect(): EntityId {
		throw `Not Implemented.`;
	}

	getNonIdFieldsSelect(): EntityUpdate {
		throw `Not Implemented.`;
	}

	getMaxIdsSelectPerRepository() {
		throw `Not implemented`;
	}

	getMaxIdSelect() {
		throw `Not implemented`;
	}

	getAllManyToOnesSelect(): EntitySelect {
		throw `Not implemented`;
	}

	getAllManyToOneIdStubsSelect(): EntitySelect {
		throw `Not implemented`;
	}

	getAllOneToManysSelect(): EntitySelect {
		throw `Not implemented`;
	}

}

export function getAllFieldsSelect(
	dbEntity: DbEntity
): IEntitySelectProperties {
	throw `Not implemented`;
}


export const DMO = {
	getAllFieldsSelect: getAllFieldsSelect
};