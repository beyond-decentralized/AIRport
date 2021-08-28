import { lib } from "@airport/di";
// Only interfaces are allowed as imports, need to track that
// Only interfaces from this project are allowed (must be able to track
// to determine that they are indeed interfaces)
import { IParent } from "./generated/parent";

// Will be in the generated folder

// API interfaces are generated from the implementation
export interface IDemoApi {

    getAllParentsWithChildren(): Promise<IParent[]>

}

const functionalityDemoSchema = lib('functionality-demo-schema')

export const DEMO_API = functionalityDemoSchema.token<IDemoApi>('IDemoApi')
