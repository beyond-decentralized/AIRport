import {
    Column,
    DbNumber,
    DbString,
    Entity,
    Id,
    OneToMany,
    Table
} from "@airport/tarmaq-entity";
import { UserAccount } from "../UserAccount";
import { Country } from "./Country";

export type Continent_Id = number;
export type Continent_Name = string;

@Entity()
@Table({ name: "CONTINENTS" })
export class Continent {

    @Id()
    @DbNumber()
    @Column({ name: 'CONTINENT_ID' })
    id: Continent_Id;

    @DbString()
    name: Continent_Name

    @OneToMany({ mappedBy: 'continent' })
    countries: Country[]

    @OneToMany({ mappedBy: 'continent' })
    userAccounts: UserAccount[]

}
