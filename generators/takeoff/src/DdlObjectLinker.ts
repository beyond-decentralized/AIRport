import {DI}                from '@airport/di'
import {
	ColumnId,
	DomainId,
	PropertyId,
	RelationId,
	SchemaIndex
}                          from '@airport/ground-control'
import {IDomain}           from '@airport/territory'
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
}                          from '@airport/traffic-pattern'
import {DDL_OBJECT_LINKER} from './diTokens'
import {DdlObjects}        from './QueryObjectInitializer'

export interface IDdlObjectLinker {

	link(
		ddlObjects: DdlObjects
	): void

}

export class DdlObjectLinker
	implements IDdlObjectLinker {

	link(
		ddlObjects: DdlObjects
	): void {
		const {
			      allSchemaVersionsByIds,
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

		this.linkDomainsAndSchemasAndVersions(
			allSchemaVersionsByIds, domains, schemas,
			latestSchemaVersions, schemaReferences)

		const entityMapById = this.linkEntities(
			allSchemaVersionsByIds, entities)

		const {
			      propertyMapById,
			      relationMapById
		      } = this.linkPropertiesAndRelations(properties, relations)

		this.linkColumns(propertyMapById, relationMapById,
			columns, propertyColumns, relationColumns)

	}

	private linkDomainsAndSchemasAndVersions(
		allSchemaVersionsByIds: ISchemaVersion[],
		domains: IDomain[],
		schemas: ISchema[],
		latestSchemaVersions: ISchemaVersion[],
		schemaReferences: ISchemaReference[]
	): void {
		const domainMapById: Map<DomainId, IDomain> = new Map()
		domains.forEach((
			domain: IDomain
		) => {
			domainMapById.set(domain.id, domain)
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

		latestSchemaVersions.forEach((
			schemaVersion: ISchemaVersion
		) => {
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
			const ownSchemaVersion        = allSchemaVersionsByIds[
				schemaReference.ownSchemaVersion.id]
			const referencedSchemaVersion = allSchemaVersionsByIds[
				schemaReference.referencedSchemaVersion.id]

			ownSchemaVersion.references[schemaReference.index] = schemaReference
			ownSchemaVersion.referencesMapByName[referencedSchemaVersion.schema.name]
			                                                   = schemaReference

			referencedSchemaVersion.referencedBy.push(schemaReference)
			referencedSchemaVersion.referencedByMapByName[ownSchemaVersion.schema.name]
				= schemaReference

			schemaReference.ownSchemaVersion        = ownSchemaVersion
			schemaReference.referencedSchemaVersion = referencedSchemaVersion
		})
	}

	private linkEntities(
		allSchemaVersionsByIds: ISchemaVersion[],
		entities: ISchemaEntity[] // All of the entities of newly created schemas
		// from the latest available versions
	): void {
		entities.forEach((
			entity: ISchemaEntity
		) => {
			const schemaVersion  = allSchemaVersionsByIds[entity.schemaVersion.id]
			entity.schemaVersion = schemaVersion
			schemaVersion.entities[entity.index] = entity
			schemaVersion.entityMapByName[entity.name] = entity

			entity.columns            = []
			entity.properties         = []
			entity.relations          = []
			entity.relationReferences = []
			entity.columnMap          = {}
			entity.idColumns          = []
			entity.idColumnMap        = {}
			entity.propertyMap        = {}
		})
	}

	private linkPropertiesAndRelations(
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
			// Entity is already property wired in
			const entity = property.entity
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
			const entity                     = relation.entity
			entity.relations[relation.index] = relation

			const relationEntity = relation.relationEntity
			relationEntity.relationReferences.push(relation)

			const property    = propertyMapById.get(relation.id)
			relation.property = property
			property.relation = [relation]

			relation.entity              = entity
			relation.relationEntity      = relationEntity
			relation.manyRelationColumns = []
			relation.oneRelationColumns  = []
			relationMapById.set(relation.id, relation)
		})

		return {
			propertyMapById,
			relationMapById
		}
	}

	private linkColumns(
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

			const entity                  = column.entity
			entity.columns[column.index]  = column
			entity.columnMap[column.name] = column

			if (column.idIndex || column.idIndex === 0) {
				entity.idColumns[column.idIndex] = column
				entity.idColumnMap[column.name]  = column
			}

			column.entity = entity

		})

		propertyColumns.forEach((
			propertyColumn: ISchemaPropertyColumn
		) => {
			const column = columnMapById.get(propertyColumn.column.id)
			column.propertyColumns.push(propertyColumn)

			const property = propertyMapById.get(propertyColumn.property.id)
			property.propertyColumns.push(propertyColumn)

			propertyColumn.column   = column
			propertyColumn.property = property
		})

		relationColumns.forEach((
			relationColumn: ISchemaRelationColumn
		) => {
			const manyColumn = columnMapById.get(relationColumn.manyColumn.id)
			manyColumn.manyRelationColumns.push(relationColumn)

			const oneColumn = columnMapById.get(relationColumn.oneColumn.id)
			oneColumn.oneRelationColumns.push(relationColumn)

			let manyRelation
			if (relationColumn.manyRelation) {
				manyRelation = relationMapById.get(relationColumn.manyRelation.id)
				manyRelation.manyRelationColumns.push(relationColumn)
			}

			let oneRelation
			if (relationColumn.oneRelation) {
				oneRelation = relationMapById.get(relationColumn.oneRelation.id)
				oneRelation.oneRelationColumns.push(relationColumn)
			}

			relationColumn.manyColumn   = manyColumn
			relationColumn.manyRelation = manyRelation
			relationColumn.oneColumn    = oneColumn
			relationColumn.oneRelation  = oneRelation
		})
	}

}

DI.set(DDL_OBJECT_LINKER, DdlObjectLinker)
