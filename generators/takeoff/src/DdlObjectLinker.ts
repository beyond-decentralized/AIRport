import type {
	IDomain,
	IApplication,
	IApplicationColumn,
	IApplicationCurrentVersion,
	IApplicationEntity,
	IApplicationProperty,
	IApplicationPropertyColumn,
	IApplicationReference,
	IApplicationRelation,
	IApplicationRelationColumn,
	IApplicationVersion
} from '@airport/airspace'
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import type {
	ColumnId,
	DomainId,
	PropertyId,
	RelationId,
	ApplicationIndex
} from '@airport/ground-control'
import type { AllDdlObjects, ITerminalStore } from '@airport/terminal-map'
import { DDL_OBJECT_LINKER } from './tokens'

export interface IDdlObjectLinker {

	link(
		ddlObjects: AllDdlObjects,
		terminalStore: ITerminalStore
	): void

}

export class DdlObjectLinker
	implements IDdlObjectLinker {

	link(
		allDdlObjects: AllDdlObjects,
		terminalStore: ITerminalStore
	): void {
		const {
			all, allApplicationVersionsByIds, added
		} = allDdlObjects
		const {
			latestApplicationVersions, properties, relations, applicationReferences, applications
		} = added

		this.linkDomainsAndApplicationsAndVersions(
			allApplicationVersionsByIds, all.domains, applications, latestApplicationVersions, applicationReferences)

		const entityArrayById: IApplicationEntity[] =
			this.linkEntities(allApplicationVersionsByIds, all.entities, added.entities)

		const {
			propertyMapById, relationMapById
		} = this.linkPropertiesAndRelations(properties, relations,
			entityArrayById, terminalStore)

		this.linkColumns(propertyMapById, relationMapById, allDdlObjects, entityArrayById, terminalStore)

	}

	private linkDomainsAndApplicationsAndVersions(
		allApplicationVersionsByIds: IApplicationVersion[],
		domains: IDomain[],
		applications: IApplication[],
		latestApplicationVersions: IApplicationVersion[],
		applicationReferences: IApplicationReference[]
	): void {
		const domainMapById: Map<DomainId, IDomain> = new Map()
		domains.forEach((domain: IDomain) => {
			domainMapById.set(domain.id, domain)
		})

		const applicationMapByIndex: Map<ApplicationIndex, IApplication> = new Map()
		applications.forEach((application: IApplication) => {
			applicationMapByIndex.set(application.index, application)
			const domain = domainMapById.get(application.domain.id)
			application.domain = domain
			domain.applications.push(<any>application)
		})

		latestApplicationVersions.forEach((applicationVersion: IApplicationVersion) => {
			const application = applicationMapByIndex.get(applicationVersion.application.index)
			let applicationCurrentVersion: IApplicationCurrentVersion = {
				application,
				applicationVersion
			}
			application.currentVersion = [applicationCurrentVersion]
			application.versions = [applicationVersion]

			applicationVersion.application = application
			applicationVersion.entities = []
			applicationVersion.references = []
			applicationVersion.referencedBy = []
			applicationVersion.entityMapByName = {}
			applicationVersion.referencesMapByName = {}
			applicationVersion.referencedByMapByName = {}
		})

		applicationReferences.forEach((applicationReference: IApplicationReference) => {
			const ownApplicationVersion = allApplicationVersionsByIds[applicationReference.ownApplicationVersion.id]
			const referencedApplicationVersion = allApplicationVersionsByIds[applicationReference.referencedApplicationVersion.id]

			ownApplicationVersion.references[applicationReference.index] = applicationReference
			ownApplicationVersion.referencesMapByName[referencedApplicationVersion.application.fullName] = applicationReference

			referencedApplicationVersion.referencedBy.push(applicationReference)
			referencedApplicationVersion.referencedByMapByName[ownApplicationVersion.application.fullName] = applicationReference

			applicationReference.ownApplicationVersion = ownApplicationVersion
			applicationReference.referencedApplicationVersion = referencedApplicationVersion
		})
	}

	private linkEntities(
		allApplicationVersionsByIds: IApplicationVersion[],
		allEntities: IApplicationEntity[], // All of the entities of newly created applications
		addedEntities: IApplicationEntity[] // All of the entities of newly created applications
		// from the latest available versions
	): IApplicationEntity[] {
		const entityArrayById: IApplicationEntity[] = []

		allEntities.forEach((entity: IApplicationEntity) => {
			entityArrayById[entity.id] = entity
		})

		addedEntities.forEach((entity: IApplicationEntity) => {
			const applicationVersion = allApplicationVersionsByIds[entity.applicationVersion.id]
			entity.applicationVersion = applicationVersion
			applicationVersion.entities[entity.index] = entity
			applicationVersion.entityMapByName[entity.name] = entity

			entityArrayById[entity.id] = entity

			entity.columns = []
			entity.properties = []
			entity.relations = []
			entity.relationReferences = []
			entity.columnMap = {}
			entity.idColumns = []
			entity.idColumnMap = {}
			entity.propertyMap = {}
		})

		return entityArrayById
	}

	private linkPropertiesAndRelations(
		properties: IApplicationProperty[],
		relations: IApplicationRelation[],
		entityArrayById: IApplicationEntity[],
		terminalStore: ITerminalStore
	): {
		propertyMapById: Map<PropertyId, IApplicationProperty>, relationMapById: Map<RelationId, IApplicationRelation>
	} {
		const propertyMapById: Map<PropertyId, IApplicationProperty> = new Map()

		properties.forEach((property: IApplicationProperty) => {
			// Entity is already property wired in
			const entity = entityArrayById[property.entity.id]
			entity.properties[property.index] = property
			entity.propertyMap[property.name] = property

			property.entity = entity

			property.propertyColumns = []

			propertyMapById.set(property.id, property)
		})

		const relationMapById: Map<RelationId, IApplicationRelation> = new Map()
		relations.forEach((relation: IApplicationRelation) => {
			const entity = entityArrayById[relation.entity.id]
			entity.relations[relation.index] = relation

			let relationEntity = entityArrayById[relation.relationEntity.id]

			if (!relationEntity) {
				relationEntity = terminalStore.getAllEntities()[relation.relationEntity.id]
			}
			relationEntity.relationReferences.push(relation)

			const property = propertyMapById.get(relation.property.id)
			relation.property = property
			property.relation = [relation]

			relation.entity = entity
			relation.relationEntity = relationEntity
			relation.manyRelationColumns = []
			relation.oneRelationColumns = []
			relationMapById.set(relation.id, relation)
		})

		return {
			propertyMapById, relationMapById
		}
	}

	private linkColumns(
		propertyMapById: Map<PropertyId, IApplicationProperty>,
		relationMapById: Map<RelationId, IApplicationRelation>,
		allDdlObjects: AllDdlObjects,
		entityArrayById: IApplicationEntity[],
		terminalStore: ITerminalStore
	) {
		const columnMapById: Map<ColumnId, IApplicationColumn> = new Map()
		allDdlObjects.all.columns.forEach((column: IApplicationColumn) => {
			columnMapById.set(column.id, column)
		})
		allDdlObjects.added.columns.forEach((column: IApplicationColumn) => {
			columnMapById.set(column.id, column)

			const entity = entityArrayById[column.entity.id]
			entity.columns[column.index] = column
			entity.columnMap[column.name] = column

			if (column.idIndex || column.idIndex === 0) {
				entity.idColumns[column.idIndex] = column
				entity.idColumnMap[column.name] = column
			}

			column.entity = entity
		})

		allDdlObjects.added.propertyColumns.forEach((propertyColumn: IApplicationPropertyColumn) => {
			const column = columnMapById.get(propertyColumn.column.id)
			column.propertyColumns.push(propertyColumn)

			const property = propertyMapById.get(propertyColumn.property.id)
			property.propertyColumns.push(propertyColumn)

			propertyColumn.column = column
			propertyColumn.property = property
		})

		allDdlObjects.added.relationColumns.forEach((relationColumn: IApplicationRelationColumn) => {
			let manyColumn = columnMapById.get(relationColumn.manyColumn.id)
			if (!manyColumn) {
				manyColumn = terminalStore.getAllColumns()[relationColumn.manyColumn.id]
			}
			manyColumn.manyRelationColumns.push(relationColumn)

			let oneColumn = columnMapById.get(relationColumn.oneColumn.id)
			if (!oneColumn) {
				oneColumn = terminalStore.getAllColumns()[relationColumn.oneColumn.id]
			}
			oneColumn.oneRelationColumns.push(relationColumn)

			let manyRelation
			if (relationColumn.manyRelation && relationColumn.manyRelation.id) {
				manyRelation = relationMapById.get(relationColumn.manyRelation.id)
				if (!manyRelation) {
					manyRelation = terminalStore.getAllRelations()[relationColumn.manyRelation.id]
				}
				manyRelation.manyRelationColumns.push(relationColumn)
			}

			let oneRelation
			if (relationColumn.oneRelation && relationColumn.oneRelation.id) {
				oneRelation = relationMapById.get(relationColumn.oneRelation.id)
				if (!oneRelation) {
					oneRelation = terminalStore.getAllRelations()[relationColumn.oneRelation.id]
				}
				oneRelation.oneRelationColumns.push(relationColumn)
			}

			relationColumn.manyColumn = manyColumn
			relationColumn.manyRelation = manyRelation
			relationColumn.oneColumn = oneColumn
			relationColumn.oneRelation = oneRelation
		})
	}

}

DEPENDENCY_INJECTION.set(DDL_OBJECT_LINKER, DdlObjectLinker)
