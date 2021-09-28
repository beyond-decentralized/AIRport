import { markForDeletion } from '@airport/autopilot'
import { DemoApi, Level1 } from '@airport/functionality-demo-schema'
import type { DeepPartial } from '@airport/pressurization';
import { allLevel1Records as allLevel1Records } from './store';
export class FunctionalityDemoService {

    private demoApi = new DemoApi()

    constructor() {
        this.getAllRecords().then()
    }

    async getAllRecords(): Promise<void> {
        const level1Records = await this.demoApi.getAllLevel1WithLevel2()
        allLevel1Records.set(level1Records)
    }

    async save(
        records: DeepPartial<Level1>[]
    ): Promise<void> {
        await this.demoApi.saveChanges(records)
        await this.getAllRecords()
    }

    async updateLevel1BoolValues(
        newBoolValue: boolean
    ): Promise<void> {
        await this.demoApi.updateAllBoolValues(newBoolValue)
        await this.getAllRecords()
    }

    async updateLevel1NumValues(
        newNumValue: number
    ): Promise<void> {
        await this.demoApi.updateAllNumValues(newNumValue)
        await this.getAllRecords()
    }

    async updateLevel1StrValues(
        newStrValue: string
    ): Promise<void> {
        await this.demoApi.updateAllStrValues(newStrValue)
        await this.getAllRecords()
    }

    addLevel1Record(
        level1Records: DeepPartial<Level1>[]
    ): void {
        level1Records.push({
            id: null,
            bool: false,
            num: 0,
            str: "",
            contained: []
        })
        allLevel1Records.set(level1Records)
    }

    addLevel2Record(
        level1Record: DeepPartial<Level1>
    ): void {
        level1Record.contained.push({
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
        const unsubscribe = allLevel1Records.subscribe(parentRecords =>
            originalParentRecords = parentRecords)
        unsubscribe()
        allLevel1Records.set([...originalParentRecords])
    }

}