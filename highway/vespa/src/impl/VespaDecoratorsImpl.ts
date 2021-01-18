import { ClassDecorator }                from '@airport/air-control';
import { IVespaDocumentWithConstructor } from '../lingo/model/VespaDocument';
import {
	VespaAttributeConfiguration,
	VespaAttributeDecorator,
	VespaDefaultDecorator,
	VespaDocumentDecorator,
	VespaFieldsetConfiguration,
	VespaIndexing
}                                        from '../lingo/VespaDecoratorsLingo';
import { store }                         from './store';

export const Document: VespaDocumentDecorator = function() {
	return function(constructor: { new(): Object }) {
		store.documentMap[constructor.name] = {
			classConstructor: constructor,
			fieldsetMap: {},
			name: constructor.name
		} as IVespaDocumentWithConstructor;
	};
};

export function Fieldset<VespaEntity>(
	vespaEntityClass: { new(...args: any[]): VespaEntity },
	fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>
): ClassDecorator {
	return function(constructor: { new(): Object }) {
		if (!vespaEntityClass || !vespaEntityClass.name) {
			throw new Error(`Please provide the class of the Vespa document
			as the first parameter to the @vespa.Fieldset decorator:
			
@vespa.Fieldset(Class, { ... })
			
			`);
		}
		const relatedDocument = store.documentMap[vespaEntityClass.name];
		if (!relatedDocument) {
			throw new Error(`No Vespa Document named :${vespaEntityClass.name} yet defined.
Please make sure that a class with a @vespa.Document decorator is defined
above the @vespa.Fieldset that references it.
`);
		}
		relatedDocument.fieldsetMap[constructor.name] = {
			fields: fieldsetConfiguration.fields as any,
			isDefault: false,
			name: constructor.name,
		};

		(constructor as any).fieldset = relatedDocument.fieldsetMap[constructor.name];
	};
}

export const Default: VespaDefaultDecorator = function() {
	return function(constructor: { new(): Object }) {
		const fieldset = (constructor as any).fieldset;
		if (!fieldset) {
			throw new Error(`@vespa.Default() decorator can only be specified
if the @vespa.Fieldset(...) as already been specified on the same class.
Please specify the @vespa.Fieldset(...) decorator on this class above
the @vespa.Default() decorator.
`);
		}
		fieldset.isDefault = true;
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
	return function(
		target: Object,
		propertyKey: string
	) {
		// TODO: add runtime logic
		if(!(target as any).prototype || !(target as any).prototype.name) {

		}
		const className     = (target as any).prototype.name;
		const vespaDocument = store.documentMap[className];

	};
}


