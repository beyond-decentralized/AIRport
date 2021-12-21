import {
	IAirportDatabase,
	orderApplicationsInOrderOfPrecedence,
	QApplication,
	QApplicationInternal,
	setQApplicationEntities
}                                   from '@airport/air-control'
import {DI}                         from '@airport/di'
import {DbApplication}                   from '@airport/ground-control'
import {IApplication}                    from '@airport/airspace'
import {QUERY_ENTITY_CLASS_CREATOR} from './tokens'

export interface IQueryEntityClassCreator {

	createAll(
		applications: IApplication[],
		airDb: IAirportDatabase
	): void

}

export class QueryEntityClassCreator
	implements IQueryEntityClassCreator {

	createAll(
		applications: IApplication[],
		airDb: IAirportDatabase
	): void {
		const applicationsToCreate = orderApplicationsInOrderOfPrecedence(<any>applications)
		applicationsToCreate.map(
			dbApplication => this.create(dbApplication, airDb))
	}

	create(
		dbApplication: DbApplication,
		airDb: IAirportDatabase
	): QApplication {
		let qApplication: QApplicationInternal = airDb.QM[dbApplication.fullName] as QApplicationInternal
		// If the Application API source has already been loaded
		if (qApplication) {
			qApplication.__dbApplication__ = dbApplication
		} else {
			qApplication                 = {
				__constructors__: {},
				__qConstructors__: {},
				__dbApplication__: dbApplication,
				name: dbApplication.name,
				domain: dbApplication.domain.name
			}
			airDb.QM[dbApplication.fullName] = qApplication
		}
		airDb.Q[dbApplication.index] = qApplication
		setQApplicationEntities(dbApplication, qApplication, airDb.qApplications)

		return qApplication
	}

}

DI.set(QUERY_ENTITY_CLASS_CREATOR, QueryEntityClassCreator)
