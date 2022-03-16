import {
    ILevel1Dao,
    ILevel2Dao
} from "./app"
import { functionalityDemoApplication } from "./tokens"

export const LEVEL_1_DAO = functionalityDemoApplication.token<ILevel1Dao>('ILevel1Dao')
export const LEVEL_2_DAO = functionalityDemoApplication.token<ILevel2Dao>('ILevel2Dao')