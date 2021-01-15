import { ClassDecorator } from '@airport/air-control';
import {
	VespaAttributeConfiguration,
	VespaAttributeDecorator,
	VespaDefaultDecorator,
	VespaDocumentDecorator,
	VespaFieldsetConfiguration,
	VespaIndexing
}                         from '../lingo/VespaDecoratorsLingo';

export const Document: VespaDocumentDecorator = function() {
	return function(constructor: { new(): Object }) {
		// TODO: add runtime logic
	};
};

export function Fieldset<VespaEntity>(
	vespaEntityClass: { new(...args: any[]): VespaEntity },
	fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>
): ClassDecorator {
	return function(constructor: { new(): Object }) {
		// TODO: add runtime logic
	};
}

export const Default: VespaDefaultDecorator = function() {
	return function(constructor: { new(): Object }) {
		// TODO: add runtime logic
	};
};

export const Attribute: VespaAttributeDecorator = function(
	attributeConfiguration: VespaAttributeConfiguration
) {
	return function(constructor: { new(): Object }) {
		// TODO: add runtime logic
	};
};

export function Index(
	indexing: VespaIndexing
): PropertyDecorator {
	return function(constructor: { new(): Object }) {
		// TODO: add runtime logic
	};
}


