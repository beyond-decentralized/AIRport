import {
	IDao,
	IDatabaseFacade
}                        from '@airport/air-control'
import {DI}              from '@airport/di'
import {DdlObjects}      from '@airport/takeoff'
import {
	DOMAIN_DAO,
	IDomainDao
}                        from '@airport/territory'
import {transactional}   from '@airport/tower'
import {
	ISchemaColumnDao,
	ISchemaDao,
	ISchemaEntityDao,
	ISchemaPropertyColumnDao,
	ISchemaPropertyDao,
	ISchemaReferenceDao,
	ISchemaRelationColumnDao,
	ISchemaRelationDao,
	ISchemaVersionDao,
	IVersionedSchemaObject,
	SCHEMA_COLUMN_DAO,
	SCHEMA_DAO,
	SCHEMA_ENTITY_DAO,
	SCHEMA_PROPERTY_COLUMN_DAO,
	SCHEMA_PROPERTY_DAO,
	SCHEMA_REFERENCE_DAO,
	SCHEMA_RELATION_COLUMN_DAO,
	SCHEMA_RELATION_DAO,
	SCHEMA_VERSION_DAO,
	SchemaPropertyColumnECreateProperties,
	SchemaReferenceECreateProperties,
	SchemaRelationColumnECreateProperties
}                        from '@airport/traffic-pattern'
import {SCHEMA_RECORDER} from '../diTokens'

export interface ISchemaRecorder {

	record(
		ddlObjects: DdlObjects,
		normalOperation: boolean
	): Promise<void>

}

export class SchemaRecorder
	implements ISchemaRecorder {

	private domainDao: Promise<IDomainDao>
	private schemaColumnDao: Promise<ISchemaColumnDao>
	private schemaDao: Promise<ISchemaDao>
	private schemaEntityDao: Promise<ISchemaEntityDao>
	private schemaPropertyColumnDao: Promise<ISchemaPropertyColumnDao>
	private schemaPropertyDao: Promise<ISchemaPropertyDao>
	private schemaReferenceDao: Promise<ISchemaReferenceDao>
	private schemaRelationColumnDao: Promise<ISchemaRelationColumnDao>
	private schemaRelationDao: Promise<ISchemaRelationDao>
	private schemaVersionDao: Promise<ISchemaVersionDao>

	constructor() {
		this.domainDao               = DI.getP(DOMAIN_DAO)
		this.schemaColumnDao         = DI.getP(SCHEMA_COLUMN_DAO)
		this.schemaDao               = DI.getP(SCHEMA_DAO)
		this.schemaEntityDao         = DI.getP(SCHEMA_ENTITY_DAO)
		this.schemaPropertyColumnDao = DI.getP(SCHEMA_PROPERTY_COLUMN_DAO)
		this.schemaPropertyDao       = DI.getP(SCHEMA_PROPERTY_DAO)
		this.schemaReferenceDao      = DI.getP(SCHEMA_REFERENCE_DAO)
		this.schemaRelationColumnDao = DI.getP(SCHEMA_RELATION_COLUMN_DAO)
		this.schemaRelationDao       = DI.getP(SCHEMA_RELATION_DAO)
		this.schemaVersionDao        = DI.getP(SCHEMA_VERSION_DAO)
	}

	async record(
		ddlObjects: DdlObjects,
		normalOperation: boolean
	): Promise<void> {
		await transactional(async () => {
			// FIXME: add support for real schema versioning
			this.setDefaultVersioning(ddlObjects)
			if (normalOperation) {
				await this.normalRecord(ddlObjects, await this.domainDao, await this.schemaDao,
					await this.schemaVersionDao, await this.schemaReferenceDao,
					await this.schemaEntityDao, await this.schemaPropertyDao,
					await this.schemaRelationDao, await this.schemaColumnDao,
					await this.schemaPropertyColumnDao, await this.schemaRelationColumnDao)
			} else {
				await this.bootstrapRecord(ddlObjects, await this.domainDao, await this.schemaDao,
					await this.schemaVersionDao, await this.schemaReferenceDao,
					await this.schemaEntityDao, await this.schemaPropertyDao,
					await this.schemaRelationDao, await this.schemaColumnDao,
					await this.schemaPropertyColumnDao, await this.schemaRelationColumnDao)
			}
		})
	}

	private async normalRecord(
		ddlObjects: DdlObjects,
		domainDao: IDomainDao,
		schemaDao: ISchemaDao,
		schemaVersionDao: ISchemaVersionDao,
		schemaReferenceDao: ISchemaReferenceDao,
		schemaEntityDao: ISchemaEntityDao,
		schemaPropertyDao: ISchemaPropertyDao,
		schemaRelationDao: ISchemaRelationDao,
		schemaColumnDao: ISchemaColumnDao,
		schemaPropertyColumnDao: ISchemaPropertyColumnDao,
		schemaRelationColumnDao: ISchemaRelationColumnDao,
	) {
		await domainDao.bulkCreate(ddlObjects.domains, false, false)
		await schemaDao.bulkCreate(ddlObjects.schemas, false, false)
		await schemaVersionDao.bulkCreate(ddlObjects.schemaVersions,
			false, false)
		await schemaReferenceDao.bulkCreate(
			ddlObjects.schemaReferences as SchemaReferenceECreateProperties[],
			false, false)
		await schemaEntityDao.bulkCreate(ddlObjects.entities, false, false)
		await schemaPropertyDao.bulkCreate(ddlObjects.properties, false, false)
		await schemaRelationDao.bulkCreate(ddlObjects.relations, false, false)
		await schemaColumnDao.bulkCreate(ddlObjects.columns, false, false)
		await schemaPropertyColumnDao.bulkCreate(
			ddlObjects.propertyColumns as SchemaPropertyColumnECreateProperties[],
			false, false)
		await schemaRelationColumnDao.bulkCreate(
			ddlObjects.relationColumns as SchemaRelationColumnECreateProperties[],
			false, false)
	}

	private setDefaultVersioning(
		ddlObjects: DdlObjects,
	) {
		for (const schemaReference of ddlObjects.schemaReferences) {
			schemaReference.deprecatedSinceVersion = null
			schemaReference.removedInVersion       = null
			schemaReference.sinceVersion           = schemaReference.ownSchemaVersion
		}
		for (const entity of ddlObjects.entities) {
			entity.deprecatedSinceVersion = null
			entity.removedInVersion       = null
			entity.sinceVersion           = entity.schemaVersion
		}
		for (const property of ddlObjects.properties) {
			property.deprecatedSinceVersion = null
			property.removedInVersion       = null
			property.sinceVersion           = property.entity.schemaVersion
		}
		for (const relation of ddlObjects.relations) {
			relation.deprecatedSinceVersion = null
			relation.removedInVersion       = null
			relation.sinceVersion           = relation.entity.schemaVersion
		}
		for (const column of ddlObjects.columns) {
			column.deprecatedSinceVersion = null
			column.removedInVersion       = null
			column.sinceVersion           = column.entity.schemaVersion
		}
		for (const propertyColumn of ddlObjects.propertyColumns) {
			propertyColumn.deprecatedSinceVersion = null
			propertyColumn.removedInVersion       = null
			propertyColumn.sinceVersion           = propertyColumn.property.entity.schemaVersion
		}
		for (const relationColumn of ddlObjects.relationColumns) {
			relationColumn.deprecatedSinceVersion = null
			relationColumn.removedInVersion       = null
			relationColumn.sinceVersion           = relationColumn.parentRelation.entity.schemaVersion
		}
	}

	private async bootstrapRecord(
		ddlObjects: DdlObjects,
		domainDao: IDomainDao,
		schemaDao: ISchemaDao,
		schemaVersionDao: ISchemaVersionDao,
		schemaReferenceDao: ISchemaReferenceDao,
		schemaEntityDao: ISchemaEntityDao,
		schemaPropertyDao: ISchemaPropertyDao,
		schemaRelationDao: ISchemaRelationDao,
		schemaColumnDao: ISchemaColumnDao,
		schemaPropertyColumnDao: ISchemaPropertyColumnDao,
		schemaRelationColumnDao: ISchemaRelationColumnDao,
	) {
		await this.bulkCreate(domainDao, ddlObjects.domains)
		await this.bulkCreate(schemaDao, ddlObjects.schemas)
		await this.bulkCreate(schemaVersionDao, ddlObjects.latestSchemaVersions)
		await this.bulkCreate(schemaReferenceDao,
			ddlObjects.schemaReferences as SchemaReferenceECreateProperties[])
		await this.bulkCreate(schemaEntityDao, ddlObjects.entities)
		await this.bulkCreate(schemaPropertyDao, ddlObjects.properties)
		await this.bulkCreate(schemaRelationDao, ddlObjects.relations)
		await this.bulkCreate(schemaColumnDao, ddlObjects.columns)
		await this.bulkCreate(schemaPropertyColumnDao,
			ddlObjects.propertyColumns as SchemaPropertyColumnECreateProperties[])
		await this.bulkCreate(schemaRelationColumnDao,
			ddlObjects.relationColumns as SchemaRelationColumnECreateProperties[])
	}

	private async bulkCreate(
		dao: IDao<any, any, any, any, any, any, any>,
		entities: any[]
	) {
		const entityDbFacade            = (dao as any).db
		const dbFacade: IDatabaseFacade = entityDbFacade.common

		await dbFacade.bulkCreate(entityDbFacade.dbEntity, entities, false, false, false)
	}

}

DI.set(SCHEMA_RECORDER, SchemaRecorder)
