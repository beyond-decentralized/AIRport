import { PropertyDocEntry } from '../parser/DocEntry'

/**
 * Created by Papa on 4/25/2016.
 */

export interface IBuilder {

	build(
		...args: any[]
	): string;

}

export interface MemberData {
	definitions: string;
}

export function getPropertyFieldType( //
	propertyDocEntry: PropertyDocEntry //
): string {
	switch (propertyDocEntry.primitive) {
		case 'boolean':
			return 'BOOLEAN'
		case 'Date':
			return 'DATE'
		case 'number':
			return 'NUMBER'
		case 'string':
		case 'Json':
			return 'STRING'
		case 'any':
			return 'ANY'
		default:
			throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
	}
}

export function getPropertyJSONOperationInterface( //
	propertyDocEntry: PropertyDocEntry //
): string {
	switch (propertyDocEntry.primitive) {
		case 'boolean':
			return 'RawBooleanOperation'
		case 'Date':
			return 'RawDateOperation'
		case 'number':
			return 'RawNumberOperation'
		case 'string':
		case 'Json':
			return 'RawStringOperation'
		case 'any':
			return 'RawUntypedOperation'
		default:
			throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
	}
}

export function getPropertyTypedOperationInterface( //
	propertyDocEntry: PropertyDocEntry //
): string {
	switch (propertyDocEntry.primitive) {
		case 'boolean':
			return 'IBooleanOperation'
		case 'Date':
			return 'IDateOperation'
		case 'number':
			return 'INumberOperation'
		case 'string':
		case 'Json':
			return 'IStringOperation'
		case 'any':
			return 'IUntypedOperation'
		default:
			throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
	}
}

export function getRelationFieldType( //
	entityProperty: PropertyDocEntry //
): string {
	if (entityProperty.isArray) {
		return 'ONE_TO_MANY'
	} else {
		return 'MANY_TO_ONE'
	}
}
