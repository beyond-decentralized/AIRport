import { ChangeListShareInfo, ChangeRecord } from "@airport/terminal-map";
import { Subject } from 'rxjs';
/**
 * Created by Papa on 12/14/2016.
 */
export declare class InMemoryChangeStore {
    private changeListMap;
    _changesAddedSubjectMap: {
        [name: string]: Subject<ChangeRecord[]>;
    };
    addChangeList(changeListName: string): void;
    addChanges(changeListName: string, changeRecords: ChangeRecord[]): Promise<void>;
    getChangeListInfos(): ChangeListShareInfo[];
    getAllChanges(changeListName: string): ChangeRecord[];
    getChangesAddedSubject(changeListName: string): Subject<ChangeRecord[]>;
}
