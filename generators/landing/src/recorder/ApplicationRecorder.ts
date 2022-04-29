import {
	IDao
} from '@airport/air-control'
import {
	IContext
} from '@airport/direction-indicator'
import { transactional } from '@airport/tower'
import {
	IApplicationColumnDao,
	IApplicationDao,
	IApplicationEntityDao,
	IApplicationPropertyColumnDao,
	IApplicationPropertyDao,
	IApplicationReferenceDao,
	IApplicationRelationColumnDao,
	IApplicationRelationDao,
	IApplicationVersionDao,
	IDomainDao,
} from '@airport/airspace'
import { DdlObjects } from '@airport/terminal-map'

export interface IApplicationRecorder {

	record(
		ddlObjects: DdlObjects,
		// normalOperation: boolean,
		context: IContext
	): Promise<void>

}

export class ApplicationRecorder
	implements IApplicationRecorder {

	applicationColumnDao: IApplicationColumnDao
	applicationDao: IApplicationDao
	applicationEntityDao: IApplicationEntityDao
	applicationPropertyColumnDao: IApplicationPropertyColumnDao
	applicationPropertyDao: IApplicationPropertyDao
	applicationReferenceDao: IApplicationReferenceDao
	applicationRelationColumnDao: IApplicationRelationColumnDao
	applicationRelationDao: IApplicationRelationDao
	applicationVersionDao: IApplicationVersionDao
	domainDao: IDomainDao

	async record(
		ddlObjects: DdlObjects,
		// normalOperation: boolean,
		context: IContext
	): Promise<void> {
		await transactional(async () => {
			// FIXME: add support for real application versioning
			this.setDefaultVersioning(ddlObjects)

			await this.domainDao.checkAndInsertIfNeeded(ddlObjects.domains)
			await this.applicationDao.insert(ddlObjects.applications)
			await this.applicationVersionDao.insert(ddlObjects.applicationVersions)
			await this.applicationReferenceDao.insert(ddlObjects.applicationReferences)
			await this.applicationEntityDao.insert(ddlObjects.entities)
			await this.applicationPropertyDao.insert(ddlObjects.properties)
			await this.applicationRelationDao.insert(ddlObjects.relations)
			await this.applicationColumnDao.insert(ddlObjects.columns)
			await this.applicationPropertyColumnDao.insert(ddlObjects.propertyColumns)
			await this.applicationRelationColumnDao.insert(ddlObjects.relationColumns)
		}, context)
	}

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

	private async bulkCreate(
		dao: IDao<any, any, any, any, any, any, any, any>,
		entities: any[],
		context: IContext
	) {
		await dao.save(entities, context)
	}

}
