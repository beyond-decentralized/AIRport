import { QOperableField } from '@airport/air-traffic-control';
import { ensureField } from '../VespaDecoratorsImpl';
export class VespaApplicationProcessor {
    async process(store) {
        for (const documentName in store.documentMap) {
            const document = store.documentMap[documentName];
            if (!document.classConstructor) {
                throw new Error(`No class constructor found for @vespa.Document() ${documentName}.
					Make sure that @vespa.Document() decorator is applied to class ${documentName}.`);
            }
            // Create an object and process all related decorators
            const object = new document.classConstructor();
            for (const propertyName in object) {
                if (!object.hasOwnProperty(propertyName)) {
                    continue;
                }
                const property = object[propertyName];
                if (!(property instanceof QOperableField)
                // || TODO: add clause to check for document
                ) {
                    throw new Error(`All properties of @vespa.Document() ${documentName}
					must be mapped to a Relational Entity property or a Join based on
					relational entities.`);
                }
                let field = document.fieldMap[propertyName];
                if (!field) {
                    field = ensureField(document, propertyName);
                }
                field.dbProperty = property.dbProperty;
                if (!field.dbProperty) {
                    throw new Error(`Field ${propertyName} in a
			@vespa.Document() ${documentName}
			must be backed by a column from a relational Entity.`);
                }
                field.dbColumn = property.dbColumn;
                if (!field.dbColumn) {
                    throw new Error(`Field ${propertyName} in a 
			@vespa.Document() ${documentName}
			must be backed by a column from a relational Entity. Property 
					${field.dbProperty.entity.name}.${field.dbProperty.name}
					is not backed a by a specific column`);
                }
            }
            let foundDefaultFieldset = false;
            for (const fieldsetName in document.fieldsetMap) {
                const fieldset = document.fieldsetMap[fieldsetName];
                if (fieldset.isDefault) {
                    if (foundDefaultFieldset) {
                        throw new Error(`More than one						
			@vespa.Default()
			@vespa.Fieldset(...)
	is found for 
			@vespa.Document() ${documentName}
	There must be exactly 1 (one) default fieldset for a given Vespa document.`);
                    }
                    foundDefaultFieldset = true;
                }
            }
            if (!foundDefaultFieldset) {
                throw new Error(`No						
			@vespa.Default()
			@vespa.Fieldset(...)
	is found for 
			@vespa.Document() ${documentName}
	There must be exactly 1 (one) default fieldset for a given Vespa document.`);
            }
        }
    }
}
//# sourceMappingURL=VespaSchemaProcessor.js.map