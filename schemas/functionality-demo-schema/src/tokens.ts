import { lib } from "@airport/di";
import { IDemoApi } from "./app";

export const functionalityDemoApplication = lib('functionality-demo-schema')

export const DEMO_API = functionalityDemoApplication.token<IDemoApi>('DEMO_API', true)