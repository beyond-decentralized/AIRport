import { lib } from "@airport/di";
export const functionalityDemoApplication = lib('functionality-demo-schema');
functionalityDemoApplication.signature = 'functionality-demo-schema';
export const DEMO_API = functionalityDemoApplication.token('IDemoApi', true);
//# sourceMappingURL=tokens.js.map