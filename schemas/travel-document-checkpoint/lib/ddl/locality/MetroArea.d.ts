import { User } from "../User";
import { Country } from "./Country";
import { State } from "./State";
export declare type MetroArea_Id = number;
export declare type MetroArea_Name = string;
export declare class MetroArea {
    id: MetroArea_Id;
    name: MetroArea_Name;
    country: Country;
    metroAreaStates: State[];
    users: User[];
}
//# sourceMappingURL=MetroArea.d.ts.map