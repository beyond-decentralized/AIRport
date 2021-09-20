import { lib } from "@airport/di";
import { IDemoApi } from "./server";

export const functionalityDemoSchema = lib('functionality-demo-schema')

export const DEMO_API = functionalityDemoSchema.token<IDemoApi>('IDemoApi', true)