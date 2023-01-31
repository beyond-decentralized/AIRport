import {
	IAirportDatabase,
	IQApplicationBuilderUtils,
	QAppInternal
} from '@airport/air-traffic-control'
import {
	QApp
} from '@airport/aviation-communication'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { DbApplication, IApplicationUtils } from '@airport/ground-control'
import { IQueryEntityClassCreator } from '@airport/terminal-map'
import { IQueryRelationManager } from '@airport/tarmaq-query'

@Injected()
export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationUtils: IApplicationUtils

	qApplicationBuilderUtils: IQApplicationBuilderUtils

	@Inject()
	relationManager: IQueryRelationManager

	createAll(
		applications: DbApplication[]
	): void {
		const applicationsToCreate = this.qApplicationBuilderUtils
			.orderApplicationsInOrderOfPrecedence(<any>applications)
		applicationsToCreate.map(
			dbApplication => this.create(dbApplication))
	}

	create(
		dbApplication: DbApplication
	): QApp {
		let qApplication: QAppInternal = this.airportDatabase.QM[dbApplication.fullName] as QAppInternal
		// If the Application API source has already been loaded
		if (qApplication) {
			qApplication.__dbDbApplication__ = dbApplication
		} else {
			qApplication = {
				__constructors__: {},
				__qConstructors__: {},
				__dbDbApplication__: dbApplication,
				name: dbApplication.name,
				domain: dbApplication.domain.name
			}
			this.airportDatabase.QM[dbApplication.fullName] = qApplication
		}
		this.airportDatabase.Q[dbApplication.index] = qApplication
		this.qApplicationBuilderUtils.setQAppEntities(dbApplication, qApplication,
			this.airportDatabase.qApplications,
			this.applicationUtils, this.relationManager)

		return qApplication
	}

}
