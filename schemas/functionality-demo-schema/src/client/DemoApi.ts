import { IOC } from "@airport/di"
import { DeepPartial } from "@airport/pressurization";
import { Level1 } from "../ddl/Level1";
import { DEMO_API } from "../tokens";

export class DemoApi {

    async getAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]> {
        const demoApi = await IOC.get(DEMO_API)

        return await demoApi.findAllLevel1WithLevel2()
    }

    async saveChanges(
        records: DeepPartial<Level1>[]
    ): Promise<void> {
        const demoApi = await IOC.get(DEMO_API)

        return await demoApi.saveChanges(records)
    }

}