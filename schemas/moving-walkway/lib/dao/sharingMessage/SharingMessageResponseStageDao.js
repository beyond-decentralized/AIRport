/*,
import {
    IUtils,
    UTILS
}                                            from "@airport/air-control";
import {AIRPORT_DATABASE}                from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase}                    from "@airport/air-control/lib/lingo/AirportDatabase";
import {
    AgtTerminalSyncLogId,
    AgtSyncRecordAddDatetime
    TmSharingMessageId
}                                            from "@airport/arrivals-n-departures";
import {Inject}                              from "typedi/decorators/Inject";
import {Service}                             from "typedi/decorators/Service";
import {
    BaseSharingMessageResponseStageDao,
    Q,
    QSharingMessageResponseStage
}                                            from "../../generated/generated";
import {SharingMessageResponseStageDaoToken} from "../../InjectionTokens";

export type SharingMessageResponseStageValues = [
    TmSharingMessageId,
    AgtTerminalSyncLogId,
    // SyncStatus,
    AgtSyncRecordAddDatetime
    ];

export interface ISharingMessageResponseStageDao {

    insertValues(
        values: SharingMessageResponseStageValues[]
    ): Promise<number>;

    delete( //
    ): Promise<number>;

}

@Service(SharingMessageResponseStageDaoToken)
export class SharingMessageResponseStageDao
    extends BaseSharingMessageResponseStageDao
    implements ISharingMessageResponseStageDao {

    constructor(
        @Inject(AIRPORT_DATABASE)
        private airportDb: IAirportDatabase,
        @Inject(UTILS)
            utils: IUtils
    ) {
        super(utils);
    }

    async insertValues(
        values: SharingMessageResponseStageValues[]
    ): Promise<number> {
        const dbEntity = Q.db.currentVersion.entityMapByName.SharingMessageResponseStage;

        let smrs: QSharingMessageResponseStage;

        return await this.airportDb.db.insertValues(dbEntity, {
            insertInto: smrs = Q.SharingMessageResponseStage,
            columns: [
                smrs.id,
                smrs.agtTerminalSyncLogId,
                // smrs.syncStatus,
                smrs.syncTimestamp
            ],
            values
        });
    }

    async delete( //
    ): Promise<number> {
        return await this.db.deleteWhere({
            deleteFrom: Q.SharingMessageResponseStage
        });
    }

}*/
//# sourceMappingURL=SharingMessageResponseStageDao.js.map