import { lib } from "@airport/di";
const functionalityDemoSchema = lib('functionality-demo-schema');
export const CHILD_DAO = functionalityDemoSchema.token('IChildDao');
export const PARENT_DAO = functionalityDemoSchema.token('IParentDao');
//# sourceMappingURL=tokens.js.map