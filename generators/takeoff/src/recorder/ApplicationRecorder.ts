import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IContext
} from '@airport/direction-indicator'
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
} from '@airport/airspace/dist/app/bundle'
import { DdlObjects, ITransactionManager } from '@airport/terminal-map'
import { IDao } from '@airport/tarmaq-dao'

export interface IApplicationRecorder {

	record(
		ddlObjects: DdlObjects,
		// normalOperation: boolean,
		context: IContext
	): Promise<void>

}

@Injected()
export class ApplicationRecorder
	implements IApplicationRecorder {

	@Inject()
	applicationColumnDao: IApplicationColumnDao

	@Inject()
	applicationDao: IApplicationDao

	@Inject()
	applicationEntityDao: IApplicationEntityDao

	@Inject()
	applicationPropertyColumnDao: IApplicationPropertyColumnDao

	@Inject()
	applicationPropertyDao: IApplicationPropertyDao

	@Inject()
	applicationReferenceDao: IApplicationReferenceDao

	@Inject()
	applicationRelationColumnDao: IApplicationRelationColumnDao

	@Inject()
	applicationRelationDao: IApplicationRelationDao

	@Inject()
	applicationVersionDao: IApplicationVersionDao

	@Inject()
	domainDao: IDomainDao

	@Inject()
	transactionManager: ITransactionManager

	async record(
		ddlObjects: DdlObjects,
		// normalOperation: boolean,
		context: IContext
	): Promise<void> {
		await this.transactionManager.transactInternal(async () => {
			// FIXME: add support for real application versioning
			this.setDefaultVersioning(ddlObjects)

			const domainDao = await (this as any).getdomainDaoAsync()
			await domainDao.checkAndInsertIfNeeded(ddlObjects.domains, context)
			await this.applicationDao.insert(ddlObjects.applications, context)
			await this.applicationVersionDao.insert(ddlObjects.applicationVersions, context)
			await this.applicationReferenceDao.insert(ddlObjects.applicationReferences, context)
			await this.applicationEntityDao.insert(ddlObjects.entities, context)
			await this.applicationPropertyDao.insert(ddlObjects.properties, context)
			await this.applicationRelationDao.insert(ddlObjects.relations, context)
			await this.applicationColumnDao.insert(ddlObjects.columns, context)
			await this.applicationPropertyColumnDao.insert(ddlObjects.propertyColumns, context)
			await this.applicationRelationColumnDao.insert(ddlObjects.relationColumns, context)
		}, null, context)
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
