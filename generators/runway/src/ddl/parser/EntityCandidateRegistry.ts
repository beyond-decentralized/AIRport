import {
	DbEntity,
	IApplication
} from '@airport/ground-control'
import {
	canBeInterface,
	getImplNameFromInterfaceName
} from '../../resolve/pathResolver'
import { DB_APPLICATION_LOADER } from '../loader/ApplicationLoader'
import { Configuration } from '../options/Options'
import {
	EntityReference,
	PropertyDocEntry
} from './DocEntry'
import {
	EntityCandidate,
	Interface
} from './EntityCandidate'
import { FileImports } from './FileImports'
import {
	endsWith,
	isPrimitive,
	startsWith
} from './utils'

/**
 * Created by Papa on 3/27/2016.
 */

export class GlobalCandidates {

	_registry: EntityCandidateRegistry
	inheritanceMap: Map<string, string> = new Map<string, string>()

	get registry(): EntityCandidateRegistry {
		if (!this._registry) {
			this._registry = new EntityCandidateRegistry()
		}

		return this._registry
	}

}

export const GLOBAL_CANDIDATES = new GlobalCandidates()

export class EntityCandidateRegistry {

	entityCandidateMap: Map<string, EntityCandidate> = new Map<string, EntityCandidate>()
	allInterfacesMap: Map<string, Interface[]> = new Map<string, Interface[]>()
	configuration: Configuration
	mappedSuperClassMap: {
		[projectName: string]: { [mappedSuperClassName: string]: EntityCandidate }
	} = {}
	enumMap: Map<string, string> = new Map()

	addCandidate(candidate: EntityCandidate): void {
		let matchesExisting = this.matchToExistingEntity(candidate)
		if (!matchesExisting) {
			this.entityCandidateMap.set(candidate.type, candidate)
		} else {
			candidate = this.entityCandidateMap.get(candidate.type)
		}
	}

	async matchVerifiedEntities(
	): Promise<{ [entityName: string]: EntityCandidate }> {
		let entityMapByName: { [entityName: string]: EntityCandidate } = {}

		for (let targetCandidate of this.entityCandidateMap.values()) {
			entityMapByName[targetCandidate.type] = targetCandidate
			if (!targetCandidate.parentClassName || targetCandidate.parentEntity) {
				continue
			}
			targetCandidate.parentEntity = this.entityCandidateMap.get(targetCandidate.parentClassName)
			if (targetCandidate.parentEntity) {
				continue
			}
			let parentType = GLOBAL_CANDIDATES.inheritanceMap[targetCandidate.type]
			while (parentType) {
				targetCandidate.parentEntity = this.entityCandidateMap.get(parentType)
				if (targetCandidate.parentEntity) {
					break
				}
				parentType = GLOBAL_CANDIDATES.inheritanceMap[parentType]
			}
			if (targetCandidate.parentEntity) {
				continue
			}

			targetCandidate.parentEntity = await this.getMappedSuperclassFromProject(
				targetCandidate.docEntry.fileImports, targetCandidate.parentClassName)
		}

		let entityInterfaceMap: { [interfaceName: string]: Interface } = {}
		for (let className in entityMapByName) {
			let entityCandidate = entityMapByName[className]
			entityCandidate.implementedInterfaceNames.forEach((interfaceName) => {
				let matchingInterfaces = this.allInterfacesMap.get(interfaceName)
				if (!matchingInterfaces || !matchingInterfaces.length) {
					return
				}
				if (matchingInterfaces.length > 1) {
					throw new Error(`
Found multiple definitions of interface '${interfaceName}' 
implemented by entity '${className}'.  Interfaces implemented by entity 
classes must have globally unique names.`)
				}
				let anInterface = matchingInterfaces[0]
				anInterface.implementedBySet.add(entityCandidate)
				entityInterfaceMap[interfaceName] = anInterface
			})
		}

		let classifiedEntitySet = this.classifyEntityProperties(entityInterfaceMap)

		return entityMapByName
	}

	classifyEntityProperties(entityInterfaceMap: { [interfaceName: string]: Interface }): Set<EntityCandidate> {
		let classifiedEntitySet: Set<EntityCandidate> = new Set<EntityCandidate>()

		for (let [candidateType, candidate] of this.entityCandidateMap) {
			classifiedEntitySet.add(candidate)
			let properties = candidate.docEntry.properties
			if (!properties) {
				return
			}
			const fileImports = candidate.docEntry.fileImports
			properties.forEach(( //
				property: PropertyDocEntry //
			) => {
				let type = property.type
				if (endsWith(type, '[]')) {
					property.isArray = true
					type = type.substr(0, type.length - 2)
				} else if (startsWith(type, 'Array<')) {
					type = type.substr(6, type.length - 1)
				}

				property.nonArrayType = type

				if (property.isTransient
					&& startsWith(type, '{') && endsWith(type, '}')) {
					property.primitive = 'Json'
					return
				}

				property.decorators.filter(
					decorator =>
						decorator.name === 'Column'
				).forEach(
					decorator => {
						decorator.values.filter(
							value =>
								value.columnDefinition
						).forEach(
							value => {
								property.columnDefinition = value.columnDefinition
							})
					})

				switch (type) {
					case 'boolean':
						property.primitive = 'boolean'
						break
					case 'number':
						property.primitive = 'number'
						break
					case 'string':
						property.primitive = 'string'
						break
					case 'Date':
						property.primitive = 'Date'
						break
					case 'any':
						property.primitive = 'any'
						break
				}
				const decorators = property.decorators
				if (decorators.some(
					decorator => decorator.name === 'Json')) {
					property.primitive = 'Json'
				}
				if (decorators.some(
					decorator => decorator.name === 'DbAny')) {
					property.primitive = 'any'
				}
				if (decorators.some(
					decorator => decorator.name === 'DbBoolean')) {
					property.primitive = 'boolean'
				}
				if (decorators.some(
					decorator => decorator.name === 'DbDate')) {
					property.primitive = 'Date'
				}
				if (decorators.some(
					decorator => decorator.name === 'DbNumber')) {
					property.primitive = 'number'
				}
				if (decorators.some(
					decorator => decorator.name === 'DbString')) {
					property.primitive = 'string'
				}
				if (property.primitive) {
					if (property.isArray) {
						throw new Error(`
Arrays are currently not supported outside of @OneToMany.
Please use @Any().
						
File:     ${property.ownerEntity.path}
Property: ${property.name}
`)
					}
					return
				}
				const objectMapFragments = type.split(':')
				if (objectMapFragments.length > 1) {
					if (!property.isTransient) {
						throw new Error(`
Non @Transient properties cannot be object maps.`)
					}
					property.isMap = true
					const objectMapValueFragment = objectMapFragments[objectMapFragments.length - 1]
					property.mapValueType = objectMapValueFragment
						.replace('}', '')
						.replace('', '')
						.trim()
					type = property.mapValueType
					property.mapValueIsPrimitive = isPrimitive(type)
					const objectMapKeyNameFragment = objectMapFragments[0]
					property.mapKeyName = objectMapKeyNameFragment
						.replace('{', '')
						.replace('[', '')
						.trim()
					const objectMapKeyTypeFragment = objectMapFragments[1]
					property.mapKeyType = objectMapKeyTypeFragment
						.replace(']', '')
						.trim()
				}
				if (!property.mapValueIsPrimitive
					&& !fileImports.importMapByObjectAsName[type]
					&& candidateType !== type) {
					throw new Error(`
Type '${type}' is not an import in ${candidate.path}.
All type references in entities must must be imported 
(needed for DDL hiding).`)
				}
				// Do not check transient properties
				if (property.isTransient) {
					return
				}
				const moduleImport = fileImports.importMapByObjectAsName[type]
				if (moduleImport && !moduleImport.isLocal) {
					const projectName = this.getProjectReferenceFromPath(moduleImport.path)
					property.fromProject = projectName
					if (!this.getReferencedApplication(projectName, property)) {
						throw new Error(`
Processing property ${property.ownerEntity.type}.${property.name}
Could not find related application in project '${projectName}'
if using external primitive types did you forget to add @DbBoolean(),
@DbNumber(), @DbDate() or @DbString() decorator to this property?`)
					}
				} else {
					let verifiedEntity: EntityCandidate = this.entityCandidateMap.get(type)
					if (verifiedEntity) {
						property.entity = verifiedEntity
						return
					}
					let anInterface = entityInterfaceMap[type]
					if (anInterface) {
						this.registerInterface(anInterface, property)
						property.entity = anInterface.implementation
					} else {
						if (canBeInterface(type)) {
							const entityType = getImplNameFromInterfaceName(type)
							verifiedEntity = this.entityCandidateMap.get(entityType)
							if (verifiedEntity) {
								const externalInterface = new Interface(null, type)
								externalInterface.implementation = verifiedEntity
								entityInterfaceMap[type] = externalInterface
								this.registerInterface(externalInterface, property)
								property.entity = verifiedEntity
							} else {
								throw new Error(`
Did not find project-local Entity type: '${entityType}' (from interface ${type}).
Did you forget to decorate it with @Entity()?`)
							}
						} else {
							throw new Error(`
Did not find project-local Entity type: '${type}'.
Did you forget to decorate it with @Entity()?`)
						}
					}
				}

			})
		}

		return classifiedEntitySet
	}

	getReferencedApplication(
		projectName: string,
		property: EntityReference & PropertyDocEntry,
	): IApplication {
		const dbApplication = DB_APPLICATION_LOADER.getReferencedApplication(projectName, property)

		property.otherApplicationDbEntity = this.getOtherApplicationEntity(projectName, dbApplication, property)

		return dbApplication
	}

	getProjectReferenceFromPath(
		path: string
	) {
		const pathFragments = path.split('/')

		if (path.indexOf('@') === 0) {
			return pathFragments[0] + '/' + pathFragments[1]
		}

		return pathFragments[0]
	}

	matchToExistingEntity(entityCandidate: EntityCandidate) {
		let existingCandidate = this.entityCandidateMap.get(entityCandidate.type)
		if (!existingCandidate) {
			return false
		}
		return true
	}

	private async getMappedSuperclassFromProject(
		fileImports: FileImports,
		type: string
	): Promise<EntityCandidate> {
		const moduleImport = fileImports.importMapByObjectAsName[type]
		if (!moduleImport || moduleImport.isLocal) {
			return null
		}
		const projectName = this.getProjectReferenceFromPath(moduleImport.path)
		const projectMappedSuperclasses = this.mappedSuperClassMap[projectName]
		if (projectMappedSuperclasses) {
			return projectMappedSuperclasses[type]
		}
		// const pathsToReferencedApplications =
		// this.configuration.airport.node_modulesLinks.pathsToReferencedApplications
		let relatedMappedSuperclassesProject
		// if (pathsToReferencedApplications && pathsToReferencedApplications[projectName]) {
		// 	let referencedApplicationRelativePath = '../../' +
		// pathsToReferencedApplications[projectName] for (let i = 0 i < 10 i++) {
		// referencedApplicationRelativePath = '../' + referencedApplicationRelativePath let
		// pathToMappedSuperclasses =
		// getFullPathFromRelativePath(referencedApplicationRelativePath, __filename) if
		// (fs.existsSync(pathToMappedSuperclasses) &&
		// fs.lstatSync(pathToMappedSuperclasses).isDirectory()) {
		// relatedMappedSuperclassesProject = require(pathToMappedSuperclasses) break } } }
		// else {
		relatedMappedSuperclassesProject = await import('file://' + process.cwd() + '/node_modules/' + projectName + '/dist/definition/mappedSuperclass.mjs')
		// }
		if (!relatedMappedSuperclassesProject) {
			throw new Error(`
Could not find related application project '${projectName}'`)
		}
		if (!relatedMappedSuperclassesProject.MAPPED_SUPERCLASS) {
			throw new Error(`
Could not find related Mapped Superclasses in project '${projectName}'`)
		}
		const mappedSuperClassMapForProject: { [mappedSuperclasName: string]: EntityCandidate } = {}
		for (const mappedSuperclass of relatedMappedSuperclassesProject.MAPPED_SUPERCLASS) {
			const entityCandidate = this.deserializeEntityCandidate(mappedSuperclass)
			mappedSuperClassMapForProject[mappedSuperclass.type] = entityCandidate
		}
		this.mappedSuperClassMap[projectName] = mappedSuperClassMapForProject

		return mappedSuperClassMapForProject[type]
	}

	private deserializeEntityCandidate(
		serializedEntityCandidate
	): EntityCandidate {
		const entityCandidate = new EntityCandidate(null, null, null)
		for (let key in serializedEntityCandidate) {
			entityCandidate[key] = serializedEntityCandidate[key]
		}

		if (entityCandidate.parentEntity) {
			entityCandidate.parentEntity = this.deserializeEntityCandidate(entityCandidate.parentEntity)
		}

		return entityCandidate
	}

	private getOtherApplicationEntity(
		projectName: string,
		dbApplication: IApplication,
		property: PropertyDocEntry,
	): DbEntity {
		const type = property.nonArrayType
		let otherApplicationDbEntity = dbApplication.currentVersion[0].applicationVersion
			.entityMapByName[type]
		if (!otherApplicationDbEntity) {
			if (canBeInterface(type)) {
				const relatedImplementationName = getImplNameFromInterfaceName(type)
				otherApplicationDbEntity = dbApplication.currentVersion[0].applicationVersion
					.entityMapByName[relatedImplementationName]
				if (!otherApplicationDbEntity) {
					throw new Error(`
Could not find entity '${relatedImplementationName}' 
(from interface ${type}) in project '${projectName}'`)
				}
			} else {
				throw new Error(`
Processing property ${property.ownerEntity.type}.${property.name}
Could not find entity '${type}' in project '${projectName}'
if using external primitive types did you forget to add @DbBoolean(), @DbNumber(), @DbDate() or @DbString() decorator to this property?`)
			}
		}

		return otherApplicationDbEntity
	}

	private registerInterface(
		anInterface: Interface,
		property: PropertyDocEntry
	): void {
		if (anInterface.implementedBySet.size > 1) {
			let implementations: string[] = []
			for (let entity of anInterface.implementedBySet) {
				implementations.push(entity.type)
			}
			throw new Error(`
Interface ${anInterface.name}, is implemented by more than one 
entity (${implementations.join(', ')}).  Interfaces used in relations can only be 
implemented by one entity.`)
		}
		let implementedEntity = anInterface.implementedBySet.values().next().value
		property.entity = implementedEntity
	}

}
