import { DI } from '@airport/di'
import type {
	ColumnId,
	DomainId,
	PropertyId,
	RelationId,
	SchemaIndex
} from '@airport/ground-control'
import type { ITerminalStore } from '@airport/terminal-map'
import type { IDomain } from '@airport/territory'
import type {
	ISchema,
	ISchemaColumn,
	ISchemaCurrentVersion,
	ISchemaEntity,
	ISchemaProperty,
	ISchemaPropertyColumn,
	ISchemaReference,
	ISchemaRelation,
	ISchemaRelationColumn,
	ISchemaVersion
} from '@airport/traffic-pattern'
import { DDL_OBJECT_LINKER } from './tokens'
import { AllDdlObjects } from './QueryObjectInitializer'

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
			all, allSchemaVersionsByIds, added
		} = allDdlObjects
		const {
			latestSchemaVersions, properties, relations, schemaReferences, schemas
		} = added

		this.linkDomainsAndSchemasAndVersions(
			allSchemaVersionsByIds, all.domains, schemas, latestSchemaVersions, schemaReferences)

		const entityArrayById: ISchemaEntity[] =
			this.linkEntities(allSchemaVersionsByIds, all.entities, added.entities)

		const {
			propertyMapById, relationMapById
		} = this.linkPropertiesAndRelations(properties, relations,
			entityArrayById, terminalStore)

		this.linkColumns(propertyMapById, relationMapById, allDdlObjects, entityArrayById, terminalStore)

	}

	private linkDomainsAndSchemasAndVersions(
		allSchemaVersionsByIds: ISchemaVersion[],
		domains: IDomain[],
		schemas: ISchema[],
		latestSchemaVersions: ISchemaVersion[],
		schemaReferences: ISchemaReference[]
	): void {
		const domainMapById: Map<DomainId, IDomain> = new Map()
		domains.forEach((domain: IDomain) => {
			domainMapById.set(domain.id, domain)
		})

		const schemaMapByIndex: Map<SchemaIndex, ISchema> = new Map()
		schemas.forEach((schema: ISchema) => {
			schemaMapByIndex.set(schema.index, schema)
			const domain = domainMapById.get(schema.domain.id)
			schema.domain = domain
			domain.schemas.push(<any>schema)
		})

		latestSchemaVersions.forEach((schemaVersion: ISchemaVersion) => {
			const schema = schemaMapByIndex.get(schemaVersion.schema.index)
			let schemaCurrentVersion: ISchemaCurrentVersion = {
				schema,
				schemaVersion
			}
			schema.currentVersion = [schemaCurrentVersion]
			schema.versions = [schemaVersion]

			schemaVersion.schema = schema
			schemaVersion.entities = []
			schemaVersion.references = []
			schemaVersion.referencedBy = []
			schemaVersion.entityMapByName = {}
			schemaVersion.referencesMapByName = {}
			schemaVersion.referencedByMapByName = {}
		})

		schemaReferences.forEach((schemaReference: ISchemaReference) => {
			const ownSchemaVersion = allSchemaVersionsByIds[schemaReference.ownSchemaVersion.id]
			const referencedSchemaVersion = allSchemaVersionsByIds[schemaReference.referencedSchemaVersion.id]

			ownSchemaVersion.references[schemaReference.index] = schemaReference
			ownSchemaVersion.referencesMapByName[referencedSchemaVersion.schema.name] = schemaReference

			referencedSchemaVersion.referencedBy.push(schemaReference)
			referencedSchemaVersion.referencedByMapByName[ownSchemaVersion.schema.name] = schemaReference

			schemaReference.ownSchemaVersion = ownSchemaVersion
			schemaReference.referencedSchemaVersion = referencedSchemaVersion
		})
	}

	private linkEntities(
		allSchemaVersionsByIds: ISchemaVersion[],
		allEntities: ISchemaEntity[], // All of the entities of newly created schemas
		addedEntities: ISchemaEntity[] // All of the entities of newly created schemas
		// from the latest available versions
	): ISchemaEntity[] {
		const entityArrayById: ISchemaEntity[] = []

		allEntities.forEach((entity: ISchemaEntity) => {
			entityArrayById[entity.id] = entity
		})

		addedEntities.forEach((entity: ISchemaEntity) => {
			const schemaVersion = allSchemaVersionsByIds[entity.schemaVersion.id]
			entity.schemaVersion = schemaVersion
			schemaVersion.entities[entity.index] = entity
			schemaVersion.entityMapByName[entity.name] = entity

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
		properties: ISchemaProperty[],
		relations: ISchemaRelation[],
		entityArrayById: ISchemaEntity[],
		terminalStore: ITerminalStore
	): {
		propertyMapById: Map<PropertyId, ISchemaProperty>, relationMapById: Map<RelationId, ISchemaRelation>
	} {
		const propertyMapById: Map<PropertyId, ISchemaProperty> = new Map()

		properties.forEach((property: ISchemaProperty) => {
			// Entity is already property wired in
			const entity = entityArrayById[property.entity.id]
			entity.properties[property.index] = property
			entity.propertyMap[property.name] = property

			property.entity = entity

			property.propertyColumns = []

			propertyMapById.set(property.id, property)
		})

		const relationMapById: Map<RelationId, ISchemaRelation> = new Map()
		relations.forEach((relation: ISchemaRelation) => {
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
		propertyMapById: Map<PropertyId, ISchemaProperty>,
		relationMapById: Map<RelationId, ISchemaRelation>,
		allDdlObjects: AllDdlObjects,
		entityArrayById: ISchemaEntity[],
		terminalStore: ITerminalStore
	) {
		const columnMapById: Map<ColumnId, ISchemaColumn> = new Map()
		allDdlObjects.all.columns.forEach((column: ISchemaColumn) => {
			columnMapById.set(column.id, column)
		})
		allDdlObjects.added.columns.forEach((column: ISchemaColumn) => {
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

		allDdlObjects.added.propertyColumns.forEach((propertyColumn: ISchemaPropertyColumn) => {
			const column = columnMapById.get(propertyColumn.column.id)
			column.propertyColumns.push(propertyColumn)

			const property = propertyMapById.get(propertyColumn.property.id)
			property.propertyColumns.push(propertyColumn)

			propertyColumn.column = column
			propertyColumn.property = property
		})

		allDdlObjects.added.relationColumns.forEach((relationColumn: ISchemaRelationColumn) => {
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

DI.set(DDL_OBJECT_LINKER, DdlObjectLinker)
