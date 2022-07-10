import { UserAccount } from "../UserAccount";
import { Country } from "./Country";
export declare type State_Abbreviation = string;
export declare type State_Id = number;
export declare type State_Name = string;
export declare class State {
    id: State_Id;
    abbreviation: State_Abbreviation;
    name: State_Name;
    country: Country;
    metroAreaStates: State[];
    userAccounts: UserAccount[];
}
//# sourceMappingURL=State.d.ts.map