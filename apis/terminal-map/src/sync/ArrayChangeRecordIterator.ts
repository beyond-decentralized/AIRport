import {
	ChangeRecord,
	ChangeRecordIterator
} from './ChangeModel'

export class ArrayChangeRecordIterator
	implements ChangeRecordIterator {

	length: number

	constructor(
		private changeRecords: ChangeRecord[],
		private nextIndex = 0
	) {
		this.length = changeRecords.length
	}

	next(): ChangeRecord {
		if (!this.hasNext()) {
			throw new Error('No more change records found')
		}
		let nextValue = this.changeRecords[this.nextIndex]
		this.nextIndex++

		return nextValue
	}

	hasNext(): boolean {
		return this.nextIndex < this.length
	}

}
