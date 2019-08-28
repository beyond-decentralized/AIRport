import { JSONBaseOperation, JsonQuery } from "@airport/ground-control";
import {
	IFieldUtils,
	IQueryUtils
}                                       from '../../..'
import { IEntityRelationFrom, IFrom } from '../../core/entity/Entity';
import { IFieldInOrderBy } from '../../core/field/FieldInOrderBy';

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
	limit: number;
	offset: number;
}

/**
 * Internal query format. All query implementations extend this.
 */
export interface IQuery {
	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JsonQuery;
}

export const Y: any = {
	airportSelectField: true
};

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
	airportSelectField: false
};

export function isN(
	object: any
): boolean {
	return object && object.airportSelectField === false;
}

export const ID: any = {
	airportSelectField: 'ID'
}

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
