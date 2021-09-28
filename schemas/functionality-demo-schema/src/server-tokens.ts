import {
    ILevel1Dao,
    ILevel2Dao
} from "./server"
import { functionalityDemoSchema } from "./tokens"

export const LEVEL_1_DAO = functionalityDemoSchema.token<ILevel1Dao>('ILevel1Dao')
export const LEVEL_2_DAO = functionalityDemoSchema.token<ILevel2Dao>('ILevel2Dao')