import {
	IAirportDatabase,
	orderApplicationsInOrderOfPrecedence,
	QApplication,
	QApplicationInternal,
	setQApplicationEntities
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IApplication } from '@airport/airspace'
import { DbApplication } from '@airport/ground-control'
import { IQueryEntityClassCreator } from '@airport/terminal-map'

@Injected()
export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

	@Inject()
	airportDatabase: IAirportDatabase

	createAll(
		applications: IApplication[]
	): void {
		const applicationsToCreate = orderApplicationsInOrderOfPrecedence(<any>applications)
		applicationsToCreate.map(
			dbApplication => this.create(dbApplication))
	}

	create(
		dbApplication: DbApplication
	): QApplication {
		let qApplication: QApplicationInternal = this.airportDatabase.QM[dbApplication.fullName] as QApplicationInternal
		// If the Application API source has already been loaded
		if (qApplication) {
			qApplication.__dbApplication__ = dbApplication
		} else {
			qApplication = {
				__constructors__: {},
				__qConstructors__: {},
				__dbApplication__: dbApplication,
				name: dbApplication.name,
				domain: dbApplication.domain.name
			}
			this.airportDatabase.QM[dbApplication.fullName] = qApplication
		}
		this.airportDatabase.Q[dbApplication.index] = qApplication
		setQApplicationEntities(dbApplication, qApplication, this.airportDatabase.qApplications)

		return qApplication
	}

}
