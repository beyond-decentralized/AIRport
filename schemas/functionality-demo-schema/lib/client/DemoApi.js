import { IOC } from "@airport/di";
import { DEMO_API } from "../tokens";
export class DemoApi {
    async getAllLevel1WithLevel2() {
        const demoApi = await IOC.get(DEMO_API);
        return await demoApi.findAllLevel1WithLevel2();
    }
    async saveChanges(records) {
        const demoApi = await IOC.get(DEMO_API);
        return await demoApi.saveChanges(records);
    }
}
//# sourceMappingURL=DemoApi.js.map