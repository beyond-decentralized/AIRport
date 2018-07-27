import { IMissingRecordDao } from "@airport/moving-walkway";
export interface IMissingRecordCreator {
}
export declare class MissingRecordCreator implements IMissingRecordCreator {
    private missingRecordDao;
    constructor(missingRecordDao: IMissingRecordDao);
}
