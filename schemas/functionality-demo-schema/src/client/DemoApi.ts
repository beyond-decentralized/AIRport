import { IOC } from "@airport/di"
import { AIRepository } from "@airport/ground-control";
import { DeepPartial } from "@airport/pressurization";
import { Level1 } from "../ddl/Level1";
import { DEMO_API } from "../tokens";

export class DemoApi {

    async addRepository(
        repositoryName: string
    ): Promise<void> {
        const demoApi = await IOC.get(DEMO_API)

        return await demoApi.addRepository(repositoryName)
    }

    async getRepositoryListings(): Promise<AIRepository[]> {
        const demoApi = await IOC.get(DEMO_API)

        return await demoApi.getRepositoryListings()
    }

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

    async updateAllBoolValues(
        newBoolValue: boolean
    ): Promise<void> {
        const demoApi = await IOC.get(DEMO_API)

        await demoApi.updateAllBoolValues(newBoolValue)
    }

    async updateAllNumValues(
        newNumValue: number
    ): Promise<void> {
        const demoApi = await IOC.get(DEMO_API)

        await demoApi.updateAllNumValues(newNumValue)
    }

    async updateAllStrValues(
        newStrValue: string
    ): Promise<void> {
        const demoApi = await IOC.get(DEMO_API)

        await demoApi.updateAllStrValues(newStrValue)
    }

}