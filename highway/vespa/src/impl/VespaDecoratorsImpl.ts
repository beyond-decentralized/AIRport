import { ClassDecorator, PropertyDecorator } from '@airport/direction-indicator';
import {
	IVespaDocument,
	IVespaDocumentWithConstructor
} from '../lingo/model/VespaDocument';
import { IVespaFieldWithDbInfo } from '../lingo/model/VespaField';
import { IVespaFieldset } from '../lingo/model/VespaFieldset';
import {
	VespaAttributeConfiguration,
	VespaAttributeDecorator,
	VespaDefaultDecorator,
	VespaDocumentDecorator,
	VespaFieldsetConfiguration,
	VespaIndexing
} from '../lingo/VespaDecoratorsLingo';
import { store } from './application/store';
import { IVespaApplicationStore } from './application/VespaApplicationStore';

export const Document: VespaDocumentDecorator = function () {
	return function (constructor: { new(): Object }) {
		const vespaDocument = ensureDocument(constructor.name, store);
		vespaDocument.classConstructor = constructor;
	};
};

export function Fieldset<VespaEntity>(
	vespaEntityClass: { new(...args: any[]): VespaEntity },
	fieldsetConfiguration?: VespaFieldsetConfiguration<VespaEntity>
): ClassDecorator {
	return function (constructor: { new(): Object }) {
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
		const fieldset = ensureFieldset(
			vespaEntityClass.name,
			constructor.name,
			store
		);
		if ((constructor as any).isDefault) {
			fieldset.isDefault = true;
		}
		(constructor as any).fieldset = fieldset;
		fieldset.fieldMap = fieldsetConfiguration.fields as any;
	};
}

export const Default: VespaDefaultDecorator = function () {
	return function (constructor: { new(): Object }) {
		const fieldset = (constructor as any).fieldset;
		if (fieldset) {
			fieldset.isDefault = true;
		} else {
			(constructor as any).isDefault = true;
		}
	};
};

export const Attribute: VespaAttributeDecorator = function (
	attributeConfiguration: VespaAttributeConfiguration
) {
	return function (
		target: Object,
		propertyKey: string
	) {
		const vespaDocument = ensureDocument(target, store);
		const field = ensureField(vespaDocument, propertyKey);
		field.attribute = attributeConfiguration;
	};
};

export function Index(
	indexing: VespaIndexing
): PropertyDecorator {
	return function (
		target: Object,
		propertyKey: string
	) {
		const vespaDocument = ensureDocument(target, store);
		const field = ensureField(vespaDocument, propertyKey);
		field.indexing = indexing;
	};
}

export function ensureField(
	document: IVespaDocument,
	name: string
): IVespaFieldWithDbInfo {
	let field = document.fieldMap[name];
	if (!field) {
		field = {
			name,
		};
		document.fieldMap[name] = field;
	}

	return field as IVespaFieldWithDbInfo;
}

function ensureDocument(
	name: string | any,
	store: IVespaApplicationStore
): IVespaDocumentWithConstructor {
	if (typeof name === 'string') {
		// The name of the class is passed in
	} else if (name.constructor) {
		name = name.constructor.name;
	} else {
		throw new Error(`Either class name or the class prototype
		must be passed in to ensureDocument.`);
	}
	let vespaDocument = store.documentMap[name];
	if (!vespaDocument) {
		vespaDocument = {
			fieldMap: {},
			fieldsetMap: {},
			name
		};
		store.documentMap[name] = vespaDocument;
	}

	return vespaDocument as IVespaDocumentWithConstructor;
}

function ensureFieldset(
	documentName: string,
	name: string,
	store: IVespaApplicationStore
): IVespaFieldset {
	const vespaDocument = ensureDocument(documentName, store);
	let fieldset = vespaDocument.fieldsetMap[name];
	if (!fieldset) {
		fieldset = {
			fieldMap: {},
			isDefault: false,
			name
		};
		vespaDocument.fieldsetMap[name] = fieldset;
	}

	return fieldset;
}
