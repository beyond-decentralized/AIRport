import {Configuration}   from '../../options/Options'
import {EntityCandidate} from '../../parser/EntityCandidate'

export class MappedSuperclassBuilder {

	mappedSuperclassVarName = 'MAPPED_SUPERCLASS'

	constructor(
		private config: Configuration,
		private entityMapByName: { [entityName: string]: EntityCandidate }
	) {
	}

	build(): string {
		const mappedSuperclasses = []

		for (const entityName in this.entityMapByName) {
			const entityCandidate: EntityCandidate = this.entityMapByName[entityName]
			const entity                           = this.buildEntity(entityCandidate)
			if (entity) {
				mappedSuperclasses.push(entity)
			}
		}

		return `export const ${this.mappedSuperclassVarName} = `
			+ JSON.stringify(mappedSuperclasses, null, '\t') + ';'
	}

	private buildEntity(
		entityCandidate: EntityCandidate
	): EntityCandidate {
		if (!entityCandidate.docEntry.isMappedSuperclass) {
			return null
		}

		const objectSet = new Set()
		objectSet.add(entityCandidate)
		this.dropCircularDependencies(entityCandidate, new Set(), entityCandidate)
		entityCandidate.project = this.config.name

		return entityCandidate
	}

	private dropCircularDependencies(
		rootObject,
		objectSet: Set<Object>,
		currentObject
	) {
		if (currentObject instanceof Array) {
			currentObject.forEach(
				childObject => {
					this.dropCircularDependencies(rootObject, objectSet, childObject)
				})
		} else if (currentObject instanceof Object) {
			objectSet.add(currentObject)
			for (const key in currentObject) {
				let childObject = currentObject[key]
				if (
					// rootObject === childObject
				// ||
					objectSet.has(childObject)
				) {
					currentObject[key] = null
				} else {
					this.dropCircularDependencies(rootObject, objectSet, childObject)
				}
			}
		}
	}

}
