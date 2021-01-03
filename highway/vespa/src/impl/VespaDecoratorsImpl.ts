import {ClassDecorator} from '@airport/air-control'
import {
	VespaAttributeConfiguration,
	VespaAttributeDecorator,
	VespaDefaultDecorator,
	VespaEntityDecorator,
	VespaFieldsetConfiguration,
	VespaIndexing
}                       from '../lingo/VespaDecoratorsLingo'

export const VespaEntity: VespaEntityDecorator = function () {
	return function (constructor: { new(): Object }) {
		// TODO: add runtime logic
	}
}

export function VespaFieldset<VespaEntity>(
	vespaEntityClass: { new(...args: any[]): VespaEntity },
	fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>
): ClassDecorator {
	return function (constructor: { new(): Object }) {
		// TODO: add runtime logic
	}
}

export const VespaDefault: VespaDefaultDecorator = function () {
	return function (constructor: { new(): Object }) {
		// TODO: add runtime logic
	}
}

export const VespaAttribute: VespaAttributeDecorator = function (
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


