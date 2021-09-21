import { lib } from "@airport/di";
export const functionalityDemoSchema = lib('functionality-demo-schema');
functionalityDemoSchema.signature = 'testValue';
export const DEMO_API = functionalityDemoSchema.token('IDemoApi', true);
//# sourceMappingURL=tokens.js.map