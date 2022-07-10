import { Continent } from "./Continent";
import { UserAccount } from "../UserAccount";
export declare type Country_Abbreviation = string;
export declare type Country_Id = number;
export declare type Country_Name = string;
export declare class Country {
    id: Country_Id;
    abbreviation: Country_Abbreviation;
    name: Country_Name;
    continent: Continent;
    userAccounts: UserAccount[];
}
//# sourceMappingURL=Country.d.ts.map