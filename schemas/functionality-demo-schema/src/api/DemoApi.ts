import { container, DI } from "@airport/di";
import { Api } from "@airport/check-in";
import { DEMO_API, Parent } from "../client";
import { DeepPartial } from "@airport/pressurization";
import { PARENT_DAO } from "../server-tokens";
export interface IDemoApi {

    findAllParentsWithChildren(): Promise<DeepPartial<Parent>[]>

    saveChanges(
        records: DeepPartial<Parent>[]
    ): Promise<void>

}

export class DemoApi implements IDemoApi {

    @Api()
    async findAllParentsWithChildren(): Promise<DeepPartial<Parent>[]> {
        const parentDao = await container(this).get(PARENT_DAO)

        return await parentDao.findAllWithChildren()
    }

    @Api()
    async saveChanges(
        records: DeepPartial<Parent>[]
    ): Promise<void> {
        const parentDao = await container(this).get(PARENT_DAO)

        await parentDao.saveChanges(records)
    }

}
DI.set(DEMO_API, DemoApi)
