import type { Parent } from '@airport/functionality-demo-schema'

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export class FunctionalityDemoService {

    records: DeepPartial<Parent>[] = [{
        id: 1,
        bool: true,
        num: 1001,
        str: "Parent-String1",
        children: [{
            id: 101,
            bool: true,
            num: 2001,
            str: "aString 1"
        }, {
            id: 102,
            bool: false,
            num: 2002,
            str: "aString 2"
        }]
    }, {
        id: 2,
        bool: false,
        num: 1002,
        str: "Parent-String2",
        children: []
    }]

    async getAllRecords(): Promise<DeepPartial<Parent>[]> {
        return this.records;
    }

    async save(
        records: DeepPartial<Parent>[]
    ): Promise<void> {
        console.log(JSON.stringify(records, null, 4));
    }

    addParent(
        records: DeepPartial<Parent>[]
    ): void {
        records.push({
            id: null,
            bool: false,
            num: 0,
            str: "",
            children: []
        })
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
    }

    delete(
        records: any[],
        toDelete: any
    ): void {
        for(let i = records.length; i >= 0; i--) {
            if(records[i] === toDelete) {
                records.splice(i, 1)
                break
            }
        }
    }

}