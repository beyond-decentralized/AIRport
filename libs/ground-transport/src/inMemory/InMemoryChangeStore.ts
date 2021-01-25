import { DI }            from '@airport/di';
import type { ISubject } from '@airport/observe';
import { RXJS }          from '@airport/observe';
import {
	ChangeListShareInfo,
	ChangeRecord
}                        from '@airport/terminal-map';

/**
 * Created by Papa on 12/14/2016.
 */

export class InMemoryChangeStore {

	_changesAddedSubjectMap: { [name: string]: ISubject<ChangeRecord[]> } = {};
	private changeListMap: { [name: string]: ChangeRecord[] }             = {};

	addChangeList(
		changeListName: string
	): void {
		if (this.changeListMap[changeListName]) {
			throw new Error(`Change List '${changeListName}' already exists`);
		}
		this.changeListMap[changeListName] = [];
	}

	async addChanges(
		changeListName: string,
		changeRecords: ChangeRecord[]
	): Promise<void> {
		this.changeListMap[changeListName] = this.changeListMap[changeListName].concat(changeRecords);
		let changesAddedSubject            = this._changesAddedSubjectMap[changeListName];
		if (changesAddedSubject) {
			changesAddedSubject.next(changeRecords);
		}
	}

	getChangeListInfos(): ChangeListShareInfo[] {
		let changeListInfos = [];
		for (let changeListName in this.changeListMap) {
			changeListInfos.push({
				name: changeListName,
				dbId: null
			});
		}
		return changeListInfos;
	}

	getAllChanges(changeListName: string): ChangeRecord[] {
		return this.changeListMap[changeListName];
	}

	getChangesAddedSubject(
		changeListName: string
	): ISubject<ChangeRecord[]> {
		let changesAddedSubject = this._changesAddedSubjectMap[changeListName];
		if (!changesAddedSubject) {
			changesAddedSubject                          = new (DI.db().getSync(RXJS).Subject)<ChangeRecord[]>();
			this._changesAddedSubjectMap[changeListName] = changesAddedSubject;
		}
		return changesAddedSubject;
	}
}
