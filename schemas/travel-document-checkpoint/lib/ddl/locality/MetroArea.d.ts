import { UserAccount } from "../UserAccount";
import { Country } from "./Country";
import { MetroAreaState } from "./MetroAreaState";
export declare type MetroArea_Id = number;
export declare type MetroArea_Name = string;
export declare class MetroArea {
    id: MetroArea_Id;
    name: MetroArea_Name;
    country: Country;
    metroAreaStates: MetroAreaState[];
    userAccounts: UserAccount[];
}
//# sourceMappingURL=MetroArea.d.ts.map