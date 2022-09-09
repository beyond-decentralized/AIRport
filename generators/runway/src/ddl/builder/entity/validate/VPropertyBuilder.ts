import { PropertyDocEntry } from '../../../parser/DocEntry'
import {
	getFullPathFromRelativePath,
	resolveRelativePath
} from '../../../../resolve/pathResolver'
import {
	IBuilder,
} from '../../Builder'
import { getVPropertyFieldInterface, IVCoreEntityBuilder } from './VCoreEntityBuilder'

/**
 * Created by Papa on 4/25/2016.
 */

export class VPropertyBuilder
	implements IBuilder {

	constructor(
		private parentBuilder: IVCoreEntityBuilder,
		public propertyDocEntry: PropertyDocEntry
	) {
	}

	build(): string {
		throw new Error(`Not Implemented.`)
	}

	buildInterfaceDefinition(): string {
		let prop = this.propertyDocEntry
		let name = prop.name
		let propertyType: string = prop.primitive
		if (propertyType === 'Json') {
			propertyType = prop.type
			let trimmedPropertyType = propertyType.trim()
			if (trimmedPropertyType.startsWith('{') || trimmedPropertyType.startsWith('[')
				|| trimmedPropertyType.endsWith('}') || trimmedPropertyType.endsWith(']')) {
				throw new Error(`@Json() type must be an imported interface.  It cannot be an inplace type definition`)
			}
			const moduleImport = this.propertyDocEntry.ownerEntity.docEntry.fileImports.importMapByObjectAsName[propertyType]

			let relativePathToImport = moduleImport.path
			if (moduleImport.path.indexOf('.') === 0) {
				const fullPathToImport = getFullPathFromRelativePath(moduleImport.path, this.propertyDocEntry.ownerEntity.path)
				relativePathToImport = resolveRelativePath(this.parentBuilder.fileBuilder.fullGenerationPath,
					fullPathToImport)
			}
			this.parentBuilder.addImport([moduleImport.objectMapByAsName[propertyType]], relativePathToImport)
		}
		let operableFieldSuffix = ' | ' + getVPropertyFieldInterface(prop)


		return `${name}?: ${propertyType}${operableFieldSuffix};`
	}

}
