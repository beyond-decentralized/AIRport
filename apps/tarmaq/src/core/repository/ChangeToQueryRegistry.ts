import {TableMap} from '@airport/ground-control'
import {ISubject} from '@airport/observe'

/**
 * Created by Papa on 9/10/2016.
 */

export class Query {
	subject: ISubject<any>
	fieldMap: TableMap
}

export class ChangeToQueryRegistry {

	activeQueries: Query[] = []

	addQuery(
		subject: ISubject<any>,
		fieldMap: TableMap
	): void {
		this.activeQueries.push({
			subject: subject,
			fieldMap: fieldMap
		})
	}

	removeQuery(
		subject: ISubject<any>
	): void {
		for (let i = 0; i < this.activeQueries.length; i++) {
			let query = this.activeQueries[i]
			if (query.subject === subject) {
				this.activeQueries.splice(i, 1)
				break
			}
		}
	}

	findAffectedQueries(
		changeRecords: any[]
	): Query[] {
		let affectedQueries = []

		// TODO: work here next

		return affectedQueries
	}
}
