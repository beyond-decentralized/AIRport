import { store } from './store';
export const Document = function () {
    return function (constructor) {
        store.documentMap[constructor.name] = {
            classConstructor: constructor,
            fieldsetMap: {},
            name: constructor.name
        };
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
        relatedDocument.fieldsetMap[constructor.name] = {
            fields: fieldsetConfiguration.fields,
            isDefault: false,
            name: constructor.name,
        };
        constructor.fieldset = relatedDocument.fieldsetMap[constructor.name];
    };
}
export const Default = function () {
    return function (constructor) {
        const fieldset = constructor.fieldset;
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
export const Attribute = function (attributeConfiguration) {
    return function (constructor) {
        // TODO: add runtime logic
    };
};
export function Index(indexing) {
    return function (target, propertyKey) {
        // TODO: add runtime logic
        if (!target.prototype || !target.prototype.name) {
        }
        const className = target.prototype.name;
        const vespaDocument = store.documentMap[className];
    };
}
//# sourceMappingURL=VespaDecoratorsImpl.js.map