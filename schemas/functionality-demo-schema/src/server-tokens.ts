import { IChildDao, IParentDao } from "./server"
import { functionalityDemoSchema } from "./tokens"

export const CHILD_DAO = functionalityDemoSchema.token<IChildDao>('IChildDao')
export const PARENT_DAO = functionalityDemoSchema.token<IParentDao>('IParentDao')