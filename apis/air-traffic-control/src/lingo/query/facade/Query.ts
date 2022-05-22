import {
	JSONBaseOperation,
	JsonQuery
} from '@airport/ground-control';
import {
	IFieldUtils
} from '../../utils/FieldUtils';
import {
	IQueryUtils
} from '../../utils/QueryUtils';
import {
	IEntityRelationFrom,
	IFrom
} from '../../core/entity/Entity';
import { IFieldInOrderBy } from '../../core/field/FieldInOrderBy';
import { IRelationManager } from '../../../impl/core/entity/RelationManager';

/**
 * Query input format, as specified by the user. All queries extend this format.
 */
export interface RawQuery {
	from?: (IFrom | IEntityRelationFrom)[];
	orderBy?: IFieldInOrderBy<any>[];
	select: any;
	where?: JSONBaseOperation;
}

export interface RawLimitedQuery {
	limit?: number;
	offset?: number;
}

/**
 * Internal query format. All query implementations extend this.
 */
export interface IQuery {
	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonQuery;
}

export const NEW_RECORD_FIELDS = {
	actor: null,
	actorRecordId: null,
	originalActor: null,
	originalActorRecordId: null,
	originalRepository: null,
}

export function ANOTHER(
	a: number,
	b?: number
): any {
};

export const Y: any = {
	airportSelectField: true,
	insert: true,
	update: false
};

export const ALL_FIELDS: any = {
	__allFields__: true
}

export const YES = Y;

export function convertToY(
	object: any
): void {
	object.airportSelectField = true;
}

export function isY(
	object: any
): boolean {
	return object && object.airportSelectField === true;
}

export const N: any = {
	airportSelectField: false,
};

export const NO = N;

export function isN(
	object: any
): boolean {
	return object && object.airportSelectField === false;
}

export const I: any = {
	insert: true,
	null: false
};

export const INSERT = I;

export function isInsert(
	object: any
): boolean {
	return object && object.insert === true;
}

export const IN: any = {
	insert: true,
	null: true
};

export const INSERT_OR_NULL = IN;

export function isInsertOrNull(
	object: any
): boolean {
	return object && object.insert === true && object.null === true;
}

export const U: any = {
	update: true
};

export const UPDATE = U;

export function isUpdate(
	object: any
): boolean {
	return object && object.update === true;
}

export const IU: any = {
	insert: true,
	update: true,
};

export const INSERT_OR_UPDATE = IU;

export function isInsertOrUpdate(
	object: any
): boolean {
	return object && object.insert === true && object.update === true;
}

export const UN: any = {
	update: true,
	null: true
};

export const UPDATE_OR_NULL = UN;

export function isUpdateOrNull(
	object: any
): boolean {
	return object && object.update === true && object.null === true;
}

export const IUN: any = {
	insertOrOther: true,
};

export const INSERT_OR_UPDATE_OR_NULL = UN;

export function isInsertOrUpdateOrNull(
	object: any
): boolean {
	return object && object.insertOrOther === true;
}

export const A: any = IUN;

export const ALL = IUN;

export const UPSERT = IUN;

export const isUpsert = isInsertOrUpdateOrNull;

export const ID: any = {
	airportSelectField: 'ID'
};

export function convertToID(
	object: any
): void {
	object.airportSelectField = 'ID';
}

export function isID(
	object: any
): boolean {
	return object && object.airportSelectField === 'ID';
}

function cleanErrorMessageSelectStatement(
	errorMessageSelectStatement: any
) {
	for (let propertyName in errorMessageSelectStatement) {
		let property = errorMessageSelectStatement[propertyName]
		if (!(property instanceof Object)) {
			continue;
		}
		if (property.hasOwnProperty("airportSelectField")) {
			switch (property.airportSelectField) {
				case "ID":
					errorMessageSelectStatement[propertyName] = "ID"
					break
				case true:
					errorMessageSelectStatement[propertyName] = "Y"
					break
				case false:
					errorMessageSelectStatement[propertyName] = "N"
					break;
			}
		} else {
			cleanErrorMessageSelectStatement(property)
		}
	}
}

export function getErrorMessageSelectStatement(
	jsonSelectClause: any
): any {
	const errorMessageSelectStatement = JSON.parse(JSON.stringify(jsonSelectClause))

	cleanErrorMessageSelectStatement(errorMessageSelectStatement)

	return JSON.stringify(errorMessageSelectStatement, null, 4)
}