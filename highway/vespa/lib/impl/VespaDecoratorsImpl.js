import { store } from './application/store';
export const Document = function () {
    return function (constructor) {
        const vespaDocument = ensureDocument(constructor.name, store);
        vespaDocument.classConstructor = constructor;
    };
};
export function Fieldset(vespaEntityClass, fieldsetConfiguration) {
    return function (constructor) {
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
        const fieldset = ensureFieldset(vespaEntityClass.name, constructor.name, store);
        if (constructor.isDefault) {
            fieldset.isDefault = true;
        }
        constructor.fieldset = fieldset;
        fieldset.fieldMap = fieldsetConfiguration.fields;
    };
}
export const Default = function () {
    return function (constructor) {
        const fieldset = constructor.fieldset;
        if (fieldset) {
            fieldset.isDefault = true;
        }
        else {
            constructor.isDefault = true;
        }
    };
};
export const Attribute = function (attributeConfiguration) {
    return function (target, propertyKey) {
        const vespaDocument = ensureDocument(target, store);
        const field = ensureField(vespaDocument, propertyKey);
        field.attribute = attributeConfiguration;
    };
};
export function Index(indexing) {
    return function (target, propertyKey) {
        const vespaDocument = ensureDocument(target, store);
        const field = ensureField(vespaDocument, propertyKey);
        field.indexing = indexing;
    };
}
export function ensureField(document, name) {
    let field = document.fieldMap[name];
    if (!field) {
        field = {
            name,
        };
        document.fieldMap[name] = field;
    }
    return field;
}
function ensureDocument(name, store) {
    if (typeof name === 'string') {
        // The name of the class is passed in
    }
    else if (name.constructor) {
        name = name.constructor.name;
    }
    else {
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
    return vespaDocument;
}
function ensureFieldset(documentName, name, store) {
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
//# sourceMappingURL=VespaDecoratorsImpl.js.map