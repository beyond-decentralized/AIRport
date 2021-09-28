import { Y } from "@airport/air-control";
import { DI } from "@airport/di";
import { DeepPartial } from "@airport/pressurization";
import { Level1 } from "../client";
import { ILevel1 } from "../generated/level1";
import { QLevel1 } from "../generated/qlevel1";
import { BaseLevel1Dao } from "../generated/generated";
import { LEVEL_1_DAO } from "../server-tokens";

export interface ILevel1Dao {

    findAllWithLevel2(): Promise<ILevel1[]>

    saveChanges(
        records: DeepPartial<Level1>[]
    ): Promise<void>

    updateAllBoolValues(
        newBoolValue: boolean
    ): Promise<void>

    updateAllNumValues(
        newNumValue: number
    ): Promise<void>

    updateAllStrValues(
        newStrValue: string
    ): Promise<void>

}

export class Level1Dao
    extends BaseLevel1Dao
    implements ILevel1Dao {

    async findAllWithLevel2(): Promise<ILevel1[]> {
        let parentRecords = []
        try {
            let level1: QLevel1
            parentRecords = await this.db.find.tree({
                select: {
                    bool: Y,
                    contained: {
                        bool: Y,
                        id: Y,
                        num: Y,
                        str: Y
                    },
                    id: Y,
                    num: Y,
                    str: Y
                },
                // FIXME: automatically derive FROM clause using SELECT clause if no FROM is provided
                from: [
                    // FIXME: create a this.Parent and type it QParent
                    level1 = this.db.from,
                    level1.contained.leftJoin()
                ]
            })
        } catch (e) {
            // Keep this JIK for debugging
            console.log(e)
            throw e
        }

        return parentRecords
    }

    async saveChanges(
        records: DeepPartial<Level1>[]
    ): Promise<void> {
        await this.save(records)
    }

    async updateAllBoolValues(
        newBoolValue: boolean
    ): Promise<void> {
        try {
            let level1: QLevel1
            await this.db.updateWhere({
                update: level1 = this.db.from,
                set: {
                    bool: newBoolValue
                }
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async updateAllNumValues(
        newNumValue: number
    ): Promise<void> {
        try {
            let level1: QLevel1
            await this.db.updateWhere({
                update: level1 = this.db.from,
                set: {
                    num: newNumValue
                }
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async updateAllStrValues(
        newStrValue: string
    ): Promise<void> {
        try {
            let level1: QLevel1
            await this.db.updateWhere({
                update: level1 = this.db.from,
                set: {
                    str: newStrValue
                }
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }

}
DI.set(LEVEL_1_DAO, Level1Dao)