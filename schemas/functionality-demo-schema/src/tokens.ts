import { lib } from "@airport/di";
import { IDemoApi } from "./server";

export const functionalityDemoApplication = lib('functionality-demo-application')
functionalityDemoApplication.signature = 'functionality-demo-application'

export const DEMO_API = functionalityDemoApplication.token<IDemoApi>('IDemoApi', true)