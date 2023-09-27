import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IContext
} from '@airport/direction-indicator'
import {
	IDbColumnDao,
	IDdlApplicationDao,
	IDbEntityDao,
	IDbPropertyColumnDao,
	IDbPropertyDao,
	IDdlApplicationReferenceDao,
	IDbRelationColumnDao,
	IDbRelationDao,
	IDdlApplicationVersionDao,
	IDdlDomainDao,
	IApplicationApiClassDao,
	IApplicationApiOperationDao,
	IApplicationApiParameterDao,
	IApplicationApiReturnTypeDao,
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
	applicationApiClassDao: IApplicationApiClassDao

	@Inject()
	applicationApiOperationDao: IApplicationApiOperationDao

	@Inject()
	applicationApiParameterDao: IApplicationApiParameterDao

	@Inject()
	applicationApiReturnTypeDao: IApplicationApiReturnTypeDao

	@Inject()
	dbColumnDao: IDbColumnDao

	@Inject()
	ddlApplicationDao: IDdlApplicationDao

	@Inject()
	dbEntityDao: IDbEntityDao

	@Inject()
	dbPropertyColumnDao: IDbPropertyColumnDao

	@Inject()
	dbPropertyDao: IDbPropertyDao

	@Inject()
	ddlApplicationReferenceDao: IDdlApplicationReferenceDao

	@Inject()
	dbRelationColumnDao: IDbRelationColumnDao

	@Inject()
	dbRelationDao: IDbRelationDao

	@Inject()
	ddlApplicationVersionDao: IDdlApplicationVersionDao

	@Inject()
	ddlDomainDao: IDdlDomainDao

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

			const ddlDomainDao = await (this as any).getddlDomainDaoAsync()
			await ddlDomainDao.checkAndInsertIfNeeded(ddlObjects.domains, context)
			await this.ddlApplicationDao.insert(ddlObjects.applications, context)
			await this.ddlApplicationVersionDao.insert(ddlObjects.applicationVersions, context)
			await this.ddlApplicationReferenceDao.insert(ddlObjects.applicationReferences, context)
			await this.dbEntityDao.insert(ddlObjects.entities, context)
			await this.dbPropertyDao.insert(ddlObjects.properties, context)
			await this.dbRelationDao.insert(ddlObjects.relations, context)
			await this.dbColumnDao.insert(ddlObjects.columns, context)
			await this.dbPropertyColumnDao.insert(ddlObjects.propertyColumns, context)
			await this.dbRelationColumnDao.insert(ddlObjects.relationColumns, context)
			await this.applicationApiReturnTypeDao.insert(ddlObjects.apiReturnTypes, context)
			await this.applicationApiParameterDao.insert(ddlObjects.apiParameters, context)
			await this.applicationApiOperationDao.insert(ddlObjects.apiOperations, context)
			await this.applicationApiClassDao.insert(ddlObjects.apiClasses, context)
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
