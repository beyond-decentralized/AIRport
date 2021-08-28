import { lib } from "@airport/di";
import { IParent } from "./generated/parent";

export interface IDemoApi {

    getAllParentsWithChildren(): Promise<IParent[]>

}

const functionalityDemoSchema = lib('functionality-demo-schema')

export const DEMO_API = functionalityDemoSchema.token<IDemoApi>('IDemoApi')
