import type { ISubject } from '@airport/observe';
import { ChangeListShareInfo, ChangeRecord } from '@airport/terminal-map';
/**
 * Created by Papa on 12/14/2016.
 */
export declare class InMemoryChangeStore {
    _changesAddedSubjectMap: {
        [name: string]: ISubject<ChangeRecord[]>;
    };
    private changeListMap;
    addChangeList(changeListName: string): void;
    addChanges(changeListName: string, changeRecords: ChangeRecord[]): Promise<void>;
    getChangeListInfos(): ChangeListShareInfo[];
    getAllChanges(changeListName: string): ChangeRecord[];
    getChangesAddedSubject(changeListName: string): ISubject<ChangeRecord[]>;
}
//# sourceMappingURL=InMemoryChangeStore.d.ts.map