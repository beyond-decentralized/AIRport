import {
	AIR_DB,
	IAirportDatabase,
	IDao
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

	async record(
		ddlObjects: DdlObjects,
		normalOperation: boolean
	): Promise<void> {
		const [airDb, domainDao, schemaColumnDao, schemaDao,
			      schemaEntityDao, schemaPropertyColumnDao, schemaPropertyDao,
			      schemaReferenceDao, schemaRelationColumnDao, schemaRelationDao,
			      schemaVersionDao] = await DI.get(
			AIR_DB, DOMAIN_DAO, SCHEMA_COLUMN_DAO, SCHEMA_DAO,
			SCHEMA_ENTITY_DAO, SCHEMA_PROPERTY_COLUMN_DAO, SCHEMA_PROPERTY_DAO,
			SCHEMA_REFERENCE_DAO, SCHEMA_RELATION_COLUMN_DAO,
			SCHEMA_RELATION_DAO, SCHEMA_VERSION_DAO
		)

		await transactional(async () => {
			// FIXME: add support for real schema versioning
			this.setDefaultVersioning(ddlObjects)
			if (normalOperation) {
				await this.normalRecord(ddlObjects, domainDao, schemaDao,
					schemaVersionDao, schemaReferenceDao,
					schemaEntityDao, schemaPropertyDao,
					schemaRelationDao, schemaColumnDao,
					schemaPropertyColumnDao, schemaRelationColumnDao)
			} else {
				await this.bootstrapRecord(airDb, ddlObjects, domainDao, schemaDao,
					schemaVersionDao, schemaReferenceDao,
					schemaEntityDao, schemaPropertyDao,
					schemaRelationDao, schemaColumnDao,
					schemaPropertyColumnDao, schemaRelationColumnDao)
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
		airDb: IAirportDatabase,
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
		await this.bulkCreate(airDb, domainDao, ddlObjects.domains)
		await this.bulkCreate(airDb, schemaDao, ddlObjects.schemas)
		await this.bulkCreate(airDb, schemaVersionDao, ddlObjects.latestSchemaVersions)
		await this.bulkCreate(airDb, schemaReferenceDao,
			ddlObjects.schemaReferences as SchemaReferenceECreateProperties[])
		await this.bulkCreate(airDb, schemaEntityDao, ddlObjects.entities)
		await this.bulkCreate(airDb, schemaPropertyDao, ddlObjects.properties)
		await this.bulkCreate(airDb, schemaRelationDao, ddlObjects.relations)
		await this.bulkCreate(airDb, schemaColumnDao, ddlObjects.columns)
		await this.bulkCreate(airDb, schemaPropertyColumnDao,
			ddlObjects.propertyColumns as SchemaPropertyColumnECreateProperties[])
		await this.bulkCreate(airDb, schemaRelationColumnDao,
			ddlObjects.relationColumns as SchemaRelationColumnECreateProperties[])
	}

	private async bulkCreate(
		airDb: IAirportDatabase,
		dao: IDao<any, any, any, any, any, any, any>,
		entities: any[]
	) {
		await airDb.bulkCreate(dao.db.dbEntity, entities, false, false, false)
	}

}

DI.set(SCHEMA_RECORDER, SchemaRecorder)
