import {
	ColumnId,
	DomainId,
	EntityId,
	PropertyId,
	RelationId,
	SchemaIndex,
	SchemaVersionId
}                             from '@airport/ground-control'
import {IDomain}              from '@airport/territory'
import {
	ISchema,
	ISchemaColumn,
	ISchemaEntity,
	ISchemaProperty,
	ISchemaPropertyColumn,
	ISchemaReference,
	ISchemaRelation,
	ISchemaRelationColumn,
	ISchemaVersion
}                             from '@airport/traffic-pattern'
import {Service}              from 'typedi'
import {DdlObjectLinkerToken} from './InjectionTokens'
import {DdlObjects}           from './QueryObjectInitializer'

export interface IDdlObjectLinker {

	link(
		ddlObjects: DdlObjects
	): void

}

@Service(DdlObjectLinkerToken)
export class DdlObjectLinker
	implements IDdlObjectLinker {

	link(
		ddlObjects: DdlObjects
	): void {
		const {
						columns,
						domains,
						entities,
						latestSchemaVersions,
						properties,
						propertyColumns,
						relationColumns,
						relations,
						schemaReferences,
						schemas
					} = ddlObjects

		const schemaVersionMapById = this.linkDomainsAndSchemasAndVersions(
			domains, schemas, latestSchemaVersions, schemaReferences)

		const entityMapById = this.linkEntities(
			schemaVersionMapById, entities)

		const {
						propertyMapById,
						relationMapById
					} = this.linkPropertiesAndRelations(
			entityMapById, properties, relations)

		this.linkColumns(entityMapById, propertyMapById, relationMapById,
			columns, propertyColumns, relationColumns)

	}

	linkDomainsAndSchemasAndVersions(
		domains: IDomain[],
		schemas: ISchema[],
		latestSchemaVersions: ISchemaVersion[],
		schemaReferences: ISchemaReference[]
	): Map<SchemaVersionId, ISchemaVersion> {
		const domainMapById: Map<DomainId, IDomain> = new Map()
		domains.forEach((
			domain: IDomain
		) => {
			domainMapById.set(domain.id, domain)
			domain.schemas = []
		})

		const schemaMapByIndex: Map<SchemaIndex, ISchema> = new Map()
		schemas.forEach((
			schema: ISchema
		) => {
			schemaMapByIndex.set(schema.index, schema)
			const domain  = domainMapById.get(schema.domain.id)
			schema.domain = domain
			domain.schemas.push(<any>schema)
		})

		const schemaVersionMapById: Map<SchemaVersionId, ISchemaVersion> = new Map()
		latestSchemaVersions.forEach((
			schemaVersion: ISchemaVersion
		) => {
			schemaVersionMapById.set(schemaVersion.id, schemaVersion)

			const schema          = schemaMapByIndex.get(schemaVersion.schema.index)
			schema.currentVersion = schemaVersion
			schema.versions       = [schemaVersion]

			schemaVersion.schema                = schema
			schemaVersion.entities              = []
			schemaVersion.references            = []
			schemaVersion.referencedBy          = []
			schemaVersion.entityMapByName       = {}
			schemaVersion.referencesMapByName   = {}
			schemaVersion.referencedByMapByName = {}
		})

		schemaReferences.forEach((
			schemaReference: ISchemaReference
		) => {
			const ownSchemaVersion        = schemaVersionMapById.get(
				schemaReference.ownSchemaVersion.id)
			const referencedSchemaVersion = schemaVersionMapById.get(
				schemaReference.referencedSchemaVersion.id)

			ownSchemaVersion.references[schemaReference.index] = schemaReference
			ownSchemaVersion.referencesMapByName[referencedSchemaVersion.schema.name]
																												 = schemaReference

			referencedSchemaVersion.referencedBy.push(schemaReference)
			referencedSchemaVersion.referencedByMapByName[ownSchemaVersion.schema.name]
				= schemaReference

			schemaReference.ownSchemaVersion        = ownSchemaVersion
			schemaReference.referencedSchemaVersion = referencedSchemaVersion
		})

		return schemaVersionMapById
	}

	private linkEntities(
		schemaVersionMapById: Map<SchemaVersionId, ISchemaVersion>,
		entities: ISchemaEntity[]
	): Map<EntityId, ISchemaEntity> {
		const entityMapById: Map<EntityId, ISchemaEntity> = new Map()

		entities.forEach((
			entity: ISchemaEntity
		) => {
			const schemaVersion  = schemaVersionMapById.get(entity.schemaVersion.id)
			entity.schemaVersion = schemaVersion
			schemaVersion.entities[entity.index]
													 = entity
			schemaVersion.entityMapByName[entity.name]
													 = entity

			entity.columns            = []
			entity.properties         = []
			entity.relations          = []
			entity.relationReferences = []
			entity.columnMap          = {}
			entity.idColumns          = []
			entity.idColumnMap        = {}
			entity.propertyMap        = {}

			entityMapById.set(entity.id, entity)
		})

		return entityMapById
	}

	private linkPropertiesAndRelations(
		entityMapById: Map<EntityId, ISchemaEntity>,
		properties: ISchemaProperty[],
		relations: ISchemaRelation[]
	): {
		propertyMapById: Map<PropertyId, ISchemaProperty>,
		relationMapById: Map<RelationId, ISchemaRelation>
	} {
		const propertyMapById: Map<PropertyId, ISchemaProperty> = new Map()

		properties.forEach((
			property: ISchemaProperty
		) => {
			const entity                      = entityMapById.get(property.entity.id)
			entity.properties[property.index] = property
			entity.propertyMap[property.name] = property

			property.entity = entity

			property.propertyColumns = []

			propertyMapById.set(property.id, property)
		})

		const relationMapById: Map<RelationId, ISchemaRelation> = new Map()
		relations.forEach((
			relation: ISchemaRelation
		) => {
			const entity                     = entityMapById.get(relation.entity.id)
			entity.relations[relation.index] = relation

			const relationEntity = entityMapById.get(relation.relationEntity.id)
			relationEntity.relationReferences.push(relation)

			const property    = propertyMapById.get(relation.id)
			relation.property = property
			property.relation = [relation]

			relation.entity              = entity
			relation.relationEntity      = relationEntity
			relation.manyRelationColumns = []
			relation.oneRelationColumns  = []
		})

		return {
			propertyMapById,
			relationMapById
		}
	}

	private linkColumns(
		entityMapById: Map<EntityId, ISchemaEntity>,
		propertyMapById: Map<PropertyId, ISchemaProperty>,
		relationMapById: Map<RelationId, ISchemaRelation>,
		columns: ISchemaColumn[],
		propertyColumns: ISchemaPropertyColumn[],
		relationColumns: ISchemaRelationColumn[]
	) {
		const columnMapById: Map<ColumnId, ISchemaColumn> = new Map()
		columns.forEach((
			column: ISchemaColumn
		) => {
			columnMapById.set(column.id, column)

			const entity = entityMapById.get(column.entity.id)
			entity.columns[column.index] = column
			entity.columnMap[column.name] = column

			if(column.idIndex || column.idIndex === 0) {
				entity.idColumns[column.idIndex] = column
				entity.idColumnMap[column.name] = column
			}

			column.entity = entity

		})

		propertyColumns.forEach((
			propertyColumn: ISchemaPropertyColumn
		) => {
			const column = columnMapById.get(propertyColumn.column.id);
			column.propertyColumns.push(propertyColumn)

			const property = propertyMapById.get(propertyColumn.property.id)
			property.propertyColumns.push(propertyColumn)

			propertyColumn.column = column
			propertyColumn.property = property
		})

		relationColumns.forEach((
			relationColumn: ISchemaRelationColumn
		) => {
			const manyColumn = columnMapById.get(relationColumn.manyColumn.id)
			manyColumn.manyRelationColumns.push(relationColumn)

			const oneColumn = columnMapById.get(relationColumn.oneColumn.id)
			oneColumn.oneRelationColumns.push(relationColumn)

			const manyRelation = relationMapById.get(relationColumn.manyRelation.id)
			manyRelation.manyRelationColumns.push(relationColumn)

			const oneRelation = relationMapById.get(relationColumn.oneRelation.id)
			oneRelation.oneRelationColumns.push(relationColumn)

			relationColumn.manyColumn = manyColumn
			relationColumn.manyRelation = manyRelation
			relationColumn.oneColumn = oneColumn
			relationColumn.oneRelation = oneRelation
		})
	}

}