import {
	IDuo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity,
	QSchema
}                 from '@airport/air-control'
import {DbEntity} from '@airport/ground-control'

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
		dbEntityName: string | DbEntity,
		qSchema?: QSchema
	) {
		if (typeof dbEntityName === 'string') {
			this.dbEntity = qSchema.db.currentVersion.entityMapByName[dbEntityName]
		} else {
			this.dbEntity = dbEntityName
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
