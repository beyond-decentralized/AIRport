import { QOperableField }                from '@airport/air-control';
import { IVespaDocumentWithConstructor } from '../../lingo/model/VespaDocument';
import { IVespaFieldWithDbInfo }         from '../../lingo/model/VespaField';
import { ensureField }                   from '../VespaDecoratorsImpl';
import { IVespaSchemaStore }             from './VespaSchemaStore';

export interface IVespaSchemaProcessor {

	process(
		store: IVespaSchemaStore
	): Promise<void>

}

export class VespaSchemaProcessor
	implements IVespaSchemaProcessor {

	async process(
		store: IVespaSchemaStore
	): Promise<void> {
		for (const documentName in store.documentMap) {
			const document: IVespaDocumentWithConstructor
				      = store.documentMap[documentName] as any;

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
				const property: QOperableField<any, any, any, any> = object[propertyName];
				if (!(property instanceof QOperableField)
					// || TODO: add clause to check for document
				) {
					throw new Error(`All properties of @vespa.Document() ${documentName}
					must be mapped to a Relational Entity property or a Join based on
					relational entities.`);
				}
				let field: IVespaFieldWithDbInfo = document.fieldMap[propertyName] as any;
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
		}
	}

}
