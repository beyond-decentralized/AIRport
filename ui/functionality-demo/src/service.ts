import { markForDeletion } from '@airport/autopilot'
import { DemoApi } from '@airport/functionality-demo-schema'
import type { Parent } from '@airport/functionality-demo-schema'
import type { DeepPartial } from '@airport/pressurization';
import { allParentRecords } from './store';
export class FunctionalityDemoService {

    private demoApi = new DemoApi()

    constructor() {
        this.getAllRecords().then()
    }

    async getAllRecords(): Promise<void> {
        const parentRecords = await this.demoApi.getAllParentsWithChildren()
        allParentRecords.set(parentRecords)
    }

    async save(
        records: DeepPartial<Parent>[]
    ): Promise<void> {
        await this.demoApi.saveChanges(records)
        await this.getAllRecords()
    }

    addParent(
        parentRecords: DeepPartial<Parent>[]
    ): void {
        parentRecords.push({
            id: null,
            bool: false,
            num: 0,
            str: "",
            children: []
        })
        allParentRecords.set(parentRecords)
    }

    addChild(
        parentRecord: DeepPartial<Parent>
    ): void {
        parentRecord.children.push({
            id: null,
            bool: false,
            num: 0,
            str: ""
        })
        this.updateStore()
    }

    delete(
        // records: any[],
        toDelete: any
    ): void {
        markForDeletion(toDelete)
        this.updateStore()
        /*
        for (let i = records.length; i >= 0; i--) {
            if (records[i] === toDelete) {
                markForDeletion(toDelete)
                break
            }
        }
        */
    }

    private updateStore() {
        let originalParentRecords
        const unsubscribe = allParentRecords.subscribe(parentRecords =>
            originalParentRecords = parentRecords)
        unsubscribe()
        allParentRecords.set([...originalParentRecords])
    }

}