import { IOC } from "@airport/di";
import { DEMO_API } from "./tokens";
export class DemoApi {
    async getAllParentsWithChildren() {
        const demoApi = await IOC.get(DEMO_API);
        return await demoApi.findAllParentsWithChildren();
    }
}
//# sourceMappingURL=DemoApi.js.map