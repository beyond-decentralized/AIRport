import {ClassDecorator} from '@airport/air-control'
import {
	VespaAttributeConfiguration,
	VespaAttributeDecorator,
	VespaDefault,
	VespaEntityDecorator,
	VespaFieldsetConfiguration,
	VespaIndexing
}                       from '../lingo/VespaDecoratorsLingo'

export const Vespa: VespaEntityDecorator = function () {
	return function (constructor: { new(): Object }) {
		// TODO: add runtime logic
	}
}

export function Fieldset<VespaEntity>(
	vespaEntityClass: { new(...args: any[]): VespaEntity },
	fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>
): ClassDecorator {
	return function (constructor: { new(): Object }) {
		// TODO: add runtime logic
	}
}

export const Default: VespaDefault = function () {
	return function (constructor: { new(): Object }) {
		// TODO: add runtime logic
	}
}

export const Attribute: VespaAttributeDecorator = function (
	attributeConfiguration: VespaAttributeConfiguration
) {
	return function (constructor: { new(): Object }) {
		// TODO: add runtime logic
	}
}

export function VespaIndex(
	indexing: VespaIndexing
): PropertyDecorator {
	return function (constructor: { new(): Object }) {
		// TODO: add runtime logic
	}
}

export const vespa = {
	Attribute: Attribute,
	Default: Default,
	Entity: Vespa,
	Fieldset: Fieldset,
	Indexing: VespaIndex,
	type: {
		bitmap: 1,
		document: 1,
		int: 1,
		long: 1,
		string: 1,
	}
}
