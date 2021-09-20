import { IOC } from "@airport/di"
import { DeepPartial } from "@airport/pressurization";
import { Parent } from "../ddl/Parent";
import { DEMO_API } from "../tokens";

export class DemoApi {

    async getAllParentsWithChildren(): Promise<DeepPartial<Parent>[]> {
        const demoApi = await IOC.get(DEMO_API)

        return await demoApi.findAllParentsWithChildren()
    }

    async saveChanges(
        records: DeepPartial<Parent>[]
    ): Promise<void> {
        const demoApi = await IOC.get(DEMO_API)

        return await demoApi.saveChanges(records)
    }

}