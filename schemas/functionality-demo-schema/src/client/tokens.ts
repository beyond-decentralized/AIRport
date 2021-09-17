import { lib } from "@airport/di";
import { IDemoApi } from "../api/DemoApi";


const functionalityDemoSchema = lib('functionality-demo-schema')

export const DEMO_API = functionalityDemoSchema.token<IDemoApi>('IDemoApi')
