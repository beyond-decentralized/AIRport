import {PropertyDocEntry} from '../../parser/DocEntry'
import {
	addImportForType,
	getFullPathFromRelativePath,
	resolveRelativePath
}                         from '../../resolve/pathResolver'
import {
	getPropertyFieldClass,
	getPropertyFieldInterface,
	IBuilder,
	IQCoreEntityBuilder
}                         from '../Builder'

/**
 * Created by Papa on 4/25/2016.
 */

export class QPropertyBuilder
	implements IBuilder {

	constructor(
		private parentBuilder: IQCoreEntityBuilder,
		public propertyDocEntry: PropertyDocEntry
	) {
	}

	buildDefinition(): string {
		let prop       = this.propertyDocEntry
		let name       = prop.name
		let fieldClass = getPropertyFieldClass(prop)

		return `${name}: I${fieldClass};`
	}

	build(): string {
		throw new Error(`Not Implemented.`)
	}

	buildInterfaceDefinition(
		optional: boolean              = true,
		forInternalInterfaces: boolean = true
	): string {
		let prop                 = this.propertyDocEntry
		let name                 = prop.name
		let propertyType: string = prop.primitive
		if (propertyType === 'Json') {
			propertyType       = prop.type
			const moduleImport = this.propertyDocEntry.ownerEntity.docEntry.fileImports.importMapByObjectAsName[propertyType]

			let relativePathToImport = moduleImport.path
			if (moduleImport.path.indexOf('.') === 0) {
				const fullPathToImport = getFullPathFromRelativePath(moduleImport.path, this.propertyDocEntry.ownerEntity.path)
				relativePathToImport   = resolveRelativePath(this.parentBuilder.fileBuilder.fullGenerationPath, fullPathToImport)
			}
			this.parentBuilder.addImport([moduleImport.objectMapByAsName[propertyType]], relativePathToImport)
		}
		let operableFieldSuffix = ''
		if (forInternalInterfaces) {
			operableFieldSuffix = ' | ' + getPropertyFieldInterface(prop)
		} else {
			if (!prop.primitive) {
				addImportForType(prop.ownerEntity, prop.type, this.parentBuilder.fileBuilder)
				propertyType = prop.type
			}
		}
		return `${name}${optional ? '?' : ''}: ${propertyType}${operableFieldSuffix};`

	}

}
