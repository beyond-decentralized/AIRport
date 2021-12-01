import {
	AIRPORT_DATABASE,
	IAirportDatabase,
	IDao
} from '@airport/air-control'
import {
	container,
	DI,
	IContext
} from '@airport/di'
import { DdlObjects } from '@airport/takeoff'
import { transactional } from '@airport/tower'
import {
	DOMAIN_DAO,
	SCHEMA_COLUMN_DAO,
	SCHEMA_DAO,
	SCHEMA_ENTITY_DAO,
	SCHEMA_PROPERTY_COLUMN_DAO,
	SCHEMA_PROPERTY_DAO,
	SCHEMA_REFERENCE_DAO,
	SCHEMA_RELATION_COLUMN_DAO,
	SCHEMA_RELATION_DAO,
	SCHEMA_VERSION_DAO,
} from '@airport/airspace'
import { SCHEMA_RECORDER } from '../tokens'

export interface IApplicationRecorder {

	record(
		ddlObjects: DdlObjects,
		// normalOperation: boolean,
		context: IContext
	): Promise<void>

}

export class ApplicationRecorder
	implements IApplicationRecorder {

	async record(
		ddlObjects: DdlObjects,
		// normalOperation: boolean,
		context: IContext
	): Promise<void> {
		const [airDb, domainDao, applicationColumnDao, applicationDao,
			applicationEntityDao, applicationPropertyColumnDao, applicationPropertyDao,
			applicationReferenceDao, applicationRelationColumnDao, applicationRelationDao,
			applicationVersionDao] = await container(this)
				.get(
					AIRPORT_DATABASE, DOMAIN_DAO, SCHEMA_COLUMN_DAO, SCHEMA_DAO,
					SCHEMA_ENTITY_DAO, SCHEMA_PROPERTY_COLUMN_DAO, SCHEMA_PROPERTY_DAO,
					SCHEMA_REFERENCE_DAO, SCHEMA_RELATION_COLUMN_DAO,
					SCHEMA_RELATION_DAO, SCHEMA_VERSION_DAO
				)

		await transactional(async () => {
			// FIXME: add support for real application versioning
			this.setDefaultVersioning(ddlObjects)

			await domainDao.checkAndInsertIfNeeded(ddlObjects.domains)

			await applicationDao.insert(ddlObjects.applications)
			
			await applicationVersionDao.insert(ddlObjects.applicationVersions)
			await applicationReferenceDao.insert(ddlObjects.applicationReferences)
			await applicationEntityDao.insert(ddlObjects.entities)
			await applicationPropertyDao.insert(ddlObjects.properties)
			await applicationRelationDao.insert(ddlObjects.relations)
			await applicationColumnDao.insert(ddlObjects.columns)
			await applicationPropertyColumnDao.insert(ddlObjects.propertyColumns)
			await applicationRelationColumnDao.insert(ddlObjects.relationColumns)
		}, context)
	}
	/*
		private async normalRecord(
			ddlObjects: DdlObjects,
			domainDao: IDomainDao,
			applicationDao: IApplicationDao,
			applicationVersionDao: IApplicationVersionDao,
			applicationReferenceDao: IApplicationReferenceDao,
			applicationEntityDao: IApplicationEntityDao,
			applicationPropertyDao: IApplicationPropertyDao,
			applicationRelationDao: IApplicationRelationDao,
			applicationColumnDao: IApplicationColumnDao,
			applicationPropertyColumnDao: IApplicationPropertyColumnDao,
			applicationRelationColumnDao: IApplicationRelationColumnDao,
			context: IContext
		) {
			// await domainDao.save(ddlObjects.domains, context)
			await applicationDao.save(ddlObjects.applications, context)
			// await applicationVersionDao.save(ddlObjects.applicationVersions, context)
			// await applicationReferenceDao.save(
			// 	ddlObjects.applicationReferences as ApplicationReferenceECreateProperties[], context)
			// await applicationEntityDao.save(ddlObjects.entities, context)
			// await applicationPropertyDao.save(ddlObjects.properties, context)
			// await applicationRelationDao.save(ddlObjects.relations, context)
			// await applicationColumnDao.save(ddlObjects.columns, context)
			// await applicationPropertyColumnDao.save(
			// 	ddlObjects.propertyColumns as ApplicationPropertyColumnECreateProperties[],
			// 	context)
			// await applicationRelationColumnDao.save(
			// 	ddlObjects.relationColumns as ApplicationRelationColumnECreateProperties[],
			// 	context)
		}
	 */
	private setDefaultVersioning(
		ddlObjects: DdlObjects,
	) {
		for (const applicationReference of ddlObjects.applicationReferences) {
			applicationReference.deprecatedSinceVersion = null
			applicationReference.removedInVersion = null
			applicationReference.sinceVersion = applicationReference.ownApplicationVersion
		}
		for (const entity of ddlObjects.entities) {
			entity.deprecatedSinceVersion = null
			entity.removedInVersion = null
			entity.sinceVersion = entity.applicationVersion
		}
		for (const property of ddlObjects.properties) {
			property.deprecatedSinceVersion = null
			property.removedInVersion = null
			property.sinceVersion = property.entity.applicationVersion
		}
		for (const relation of ddlObjects.relations) {
			relation.deprecatedSinceVersion = null
			relation.removedInVersion = null
			relation.sinceVersion = relation.entity.applicationVersion
		}
		for (const column of ddlObjects.columns) {
			column.deprecatedSinceVersion = null
			column.removedInVersion = null
			column.sinceVersion = column.entity.applicationVersion
		}
		for (const propertyColumn of ddlObjects.propertyColumns) {
			propertyColumn.deprecatedSinceVersion = null
			propertyColumn.removedInVersion = null
			propertyColumn.sinceVersion = propertyColumn.property.entity.applicationVersion
		}
		for (const relationColumn of ddlObjects.relationColumns) {
			relationColumn.deprecatedSinceVersion = null
			relationColumn.removedInVersion = null
			relationColumn.sinceVersion = relationColumn.parentRelation.entity.applicationVersion
		}
	}
	/* 
		private async bootstrapRecord(
			airDb: IAirportDatabase,
			ddlObjects: DdlObjects,
			domainDao: IDomainDao,
			applicationDao: IApplicationDao,
			applicationVersionDao: IApplicationVersionDao,
			applicationReferenceDao: IApplicationReferenceDao,
			applicationEntityDao: IApplicationEntityDao,
			applicationPropertyDao: IApplicationPropertyDao,
			applicationRelationDao: IApplicationRelationDao,
			applicationColumnDao: IApplicationColumnDao,
			applicationPropertyColumnDao: IApplicationPropertyColumnDao,
			applicationRelationColumnDao: IApplicationRelationColumnDao,
			context: IContext
		) {
			// await this.bulkCreate(domainDao, ddlObjects.domains, context)
			await this.bulkCreate(applicationDao, ddlObjects.applications, context)
			// await this.bulkCreate(applicationVersionDao, ddlObjects.latestApplicationVersions, context)
			// await this.bulkCreate(applicationReferenceDao,
			// 	ddlObjects.applicationReferences as ApplicationReferenceECreateProperties[], context)
			// await this.bulkCreate(applicationEntityDao, ddlObjects.entities, context)
			// await this.bulkCreate(applicationPropertyDao, ddlObjects.properties, context)
			// await this.bulkCreate(applicationRelationDao, ddlObjects.relations, context)
			// await this.bulkCreate(applicationColumnDao, ddlObjects.columns, context)
			// await this.bulkCreate(applicationPropertyColumnDao,
			// 	ddlObjects.propertyColumns as ApplicationPropertyColumnECreateProperties[], context)
			// await this.bulkCreate(applicationRelationColumnDao,
			// 	ddlObjects.relationColumns as ApplicationRelationColumnECreateProperties[], context)
		}
	 */
	private async bulkCreate(
		dao: IDao<any, any, any, any, any, any, any, any>,
		entities: any[],
		context: IContext
	) {
		await dao.save(entities, context)
	}

}

DI.set(SCHEMA_RECORDER, ApplicationRecorder)
