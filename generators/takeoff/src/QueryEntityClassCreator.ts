import {
	IAirportDatabase,
	orderApplicationsInOrderOfPrecedence,
	QApplication,
	QApplicationInternal,
	setQApplicationEntities
} from '@airport/air-control'
import { IApplication } from '@airport/airspace'
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { DbApplication } from '@airport/ground-control'
import { IQueryEntityClassCreator } from '@airport/terminal-map'
import { QUERY_ENTITY_CLASS_CREATOR } from './tokens'

export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

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
DEPENDENCY_INJECTION.set(QUERY_ENTITY_CLASS_CREATOR, QueryEntityClassCreator)
