import { lib } from "@airport/di";
import { IDemoApi } from "./server";

export const functionalityDemoSchema = lib('functionality-demo-schema')
functionalityDemoSchema.signature = 'testValue'

export const DEMO_API = functionalityDemoSchema.token<IDemoApi>('IDemoApi', true)