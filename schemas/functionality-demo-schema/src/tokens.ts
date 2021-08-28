import { lib } from "@airport/di";
import { IChildDao } from "./dao/ChildDao";
import { IParentDao } from "./dao/ParentDao";

const functionalityDemoSchema = lib('functionality-demo-schema')

export const CHILD_DAO = functionalityDemoSchema.token<IChildDao>('IChildDao')
export const PARENT_DAO = functionalityDemoSchema.token<IParentDao>('IParentDao')