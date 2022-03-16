import { DATABASE_FACADE } from "@airport/air-control";
import { Api } from "@airport/check-in";
import { container, DI } from "@airport/di";
import { IRepository } from "@airport/holding-pattern";
import { DeepPartial } from "@airport/pressurization";
import {
    DEMO_API,
    Level1
} from "../client";
import { LEVEL_1_DAO as LEVEL_1_DAO } from "../server-tokens";

export interface IDemoApi {

    addRepository(
        repositoryName: string
    ): Promise<void>

    findAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>

    saveChanges(
        records: DeepPartial<Level1>[]
    ): Promise<void>

    updateAllBoolValues(
        newBoolValue: boolean
    ): Promise<void>

    updateAllNumValues(
        newNumValue: number
    ): Promise<void>

    updateAllStrValues(
        newStrValue: string
    ): Promise<void>

}

export class DemoApi implements IDemoApi {

    @Api()
    async addRepository(
        repositoryName: string
    ): Promise<void> {
        const databaseFacade = await container(this).get(DATABASE_FACADE)

        await databaseFacade.addRepository()
    }


    @Api()
    async findAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]> {
        const level1Dao = await container(this).get(LEVEL_1_DAO)

        return await level1Dao.findAllWithLevel2()
    }

    @Api()
    async saveChanges(
        records: DeepPartial<Level1>[]
    ): Promise<void> {
        const level1Dao = await container(this).get(LEVEL_1_DAO)

        await level1Dao.saveChanges(records)
    }

    @Api()
    async updateAllBoolValues(
        newBoolValue: boolean
    ): Promise<void> {
        const level1Dao = await container(this).get(LEVEL_1_DAO)

        await level1Dao.updateAllBoolValues(newBoolValue)
    }

    @Api()
    async updateAllNumValues(
        newNumValue: number
    ): Promise<void> {
        const level1Dao = await container(this).get(LEVEL_1_DAO)

        await level1Dao.updateAllNumValues(newNumValue)
    }

    @Api()
    async updateAllStrValues(
        newStrValue: string
    ): Promise<void> {
        const level1Dao = await container(this).get(LEVEL_1_DAO)

        await level1Dao.updateAllStrValues(newStrValue)
    }

}
DI.set(DEMO_API, DemoApi)
