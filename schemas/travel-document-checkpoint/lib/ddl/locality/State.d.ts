import { User } from "../User";
import { Country } from "./Country";
export declare type State_Id = number;
export declare type State_Name = string;
export declare class State {
    id: State_Id;
    name: State_Name;
    country: Country;
    metroAreaStates: State[];
    users: User[];
}
//# sourceMappingURL=State.d.ts.map