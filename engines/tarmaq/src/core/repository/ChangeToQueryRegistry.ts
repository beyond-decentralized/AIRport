import {TableMap} from '@airport/ground-control'
import {Subject} from 'rxjs'

/**
 * Created by Papa on 9/10/2016.
 */

export class Query {
	subject: Subject<any>
	fieldMap: TableMap
}

export class ChangeToQueryRegistry {

	activeQueries: Query[] = []

	addQuery(
		subject: Subject<any>,
		fieldMap: TableMap
	): void {
		this.activeQueries.push({
			subject: subject,
			fieldMap: fieldMap
		})
	}

	removeQuery(
		subject: Subject<any>
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
