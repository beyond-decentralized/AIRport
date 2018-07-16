import { IDatabase } from "../../generated/infrastructure/qdatabase";
import { IUser } from "../../generated/infrastructure/quser";
export declare type DatabaseId = number;
export declare type DatabaseIsLocal = boolean;
export declare type DatabaseName = string;
export declare type DatabaseSecondId = number;
export declare class Database implements IDatabase {
    id: DatabaseId;
    name: DatabaseName;
    secondId: DatabaseSecondId;
    owner: IUser;
    isLocal: DatabaseIsLocal;
}
