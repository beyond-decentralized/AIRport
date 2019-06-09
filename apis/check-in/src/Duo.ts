import {
	IDuo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity,
	QSchema
}                 from '@airport/air-control'
import {DbEntity, EntityId as DbEntityId} from '@airport/ground-control'

/**
 * Created by Papa on 8/26/2017.
 */


/**
 * Data Manipulation object.
 */
export class Duo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdate extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	implements IDuo<Entity, EntitySelect, EntityCreate, EntityUpdate, EntityId, IQE> {

	private dbEntity: DbEntity

	constructor(
		dbEntityId: DbEntityId | DbEntity,
		qSchema?: QSchema
	) {
		if (typeof dbEntityId === 'number') {
			this.dbEntity = qSchema.__dbSchema__.currentVersion.entities[dbEntityId]
		} else {
			this.dbEntity = dbEntityId
		}
	}

	getIdStub(
		ids: number | string | number[] | string[]
	): EntityId {
		throw `Not Implemented.`
	}

	getIdStubs(
		ids: number[] | string[] | number[][] | string[][]
	): EntityId[] {
		throw `Not Implemented.`
	}

	getAllFieldsSelect(): EntitySelect {
		throw `Not Implemented.`
	}

	getIdFieldsSelect(): EntityId {
		throw `Not Implemented.`
	}

	getNonIdFieldsSelect(): EntityUpdate {
		throw `Not Implemented.`
	}

	getMaxIdsSelectPerRepository() {
		throw `Not implemented`
	}

	getMaxIdSelect() {
		throw `Not implemented`
	}

	getAllManyToOnesSelect(): EntitySelect {
		throw `Not implemented`
	}

	getAllManyToOneIdStubsSelect(): EntitySelect {
		throw `Not implemented`
	}

	getAllOneToManysSelect(): EntitySelect {
		throw `Not implemented`
	}

}

export function getAllFieldsSelect(
	dbEntity: DbEntity
): IEntitySelectProperties {
	throw `Not implemented`
}


export const DUO = {
	getAllFieldsSelect: getAllFieldsSelect
}
