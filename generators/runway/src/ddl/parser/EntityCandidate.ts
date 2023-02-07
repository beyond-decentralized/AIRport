import {
	ClassDocEntry,
	DocEntry,
	PropertyDocEntry
} from './DocEntry'

/**
 * Created by Papa on 3/27/2016.
 */

export class Interface {

	implementedBySet: Set<EntityCandidate> = new Set<EntityCandidate>()

	implementation?: EntityCandidate

	constructor(
		path: string,
		public name: string
	) {
	}
}

export class EntityCandidate {

	docEntry: ClassDocEntry
	ids: DocEntry[] = []
	implementedInterfaceNames: string[]
	project: string

	static create(
		type: string,
		path: string,
		parentClass: string,
		parentImport: string,
		isSuperClass: boolean
	): EntityCandidate {
		return new EntityCandidate(type, path, parentClass, parentImport, undefined, isSuperClass)
	}

	public parentEntity: EntityCandidate

	constructor(
		public type: string,
		public path: string,
		public parentClassName: string,
		private location?: string,
		private verified?: boolean,
		public isSuperclass?: boolean
	) {
		if (!type) {
			return
		}
		console.log(`\tcreating entity: ${type}, parent: ${parentClassName}, isSuperclass: ${isSuperclass}`)
	}

	getIdProperties(): PropertyDocEntry[] {
		return this.getPropertiesOfType(true)
	}

	getNonIdProperties(): PropertyDocEntry[] {
		return this.getPropertiesOfType(false)
	}

	private getPropertiesOfType(
		isId: boolean
	): PropertyDocEntry[] {
		let i = 0;
		return this.docEntry.properties.filter((
			property,
			index
		) => {
			if (property.isTransient) {
				return false
			}
			property.index     = i++
			const idDecorators = property.decorators.filter(
				decorator => {
					return decorator.name === 'Id'
				})
			if (isId) {
				return !!idDecorators.length
			} else {
				return !idDecorators.length
			}
		})
	}

	getTransientProperties(): PropertyDocEntry[] {
		return this.docEntry.properties.filter((
			property,
			index
		) => {
			return property.isTransient
		})
	}

	matches(
		type: string,
		location?: string
	): boolean {
		return this.type === type
	}

}
