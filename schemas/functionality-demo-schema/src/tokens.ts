import { lib } from "@airport/di";
import { IDemoApi } from "./server";

export const functionalityDemoApplication = lib('functionality-demo-schema')
functionalityDemoApplication.signature = 'functionality-demo-schema'

export const DEMO_API = functionalityDemoApplication.token<IDemoApi>('DEMO_API', true)