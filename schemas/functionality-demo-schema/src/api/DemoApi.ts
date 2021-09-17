import { container, DI } from "@airport/di";
import { Api } from "@airport/check-in";
import { PARENT_DAO } from "../tokens";
import { IParent } from "../generated/parent";
import { DEMO_API } from "../client";
export interface IDemoApi {

    findAllParentsWithChildren(): Promise<IParent[]>

}

export class DemoApi implements IDemoApi {

    @Api()
    async findAllParentsWithChildren(): Promise<IParent[]> {
        const parentDao = await container(this).get(PARENT_DAO)

        return await parentDao.findAllWithChildren()
    }

}
DI.set(DEMO_API, DemoApi)
