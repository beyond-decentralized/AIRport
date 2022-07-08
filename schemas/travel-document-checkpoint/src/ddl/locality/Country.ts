import {
    Column,
    DbNumber,
    DbString,
    Entity,
    GeneratedValue,
    Id,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Table
} from "@airport/air-traffic-control";
import { Continent } from "./Continent";
import { UserAccount } from "../UserAccount";

export type Country_Abbreviation = string;
export type Country_Id = number;
export type Country_Name = string;

@Entity()
@Table({ name: "COUNTRIES" })
export class Country {

    @Id()
    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'COUNTRY_ID' })
    id: Country_Id;

    @DbString()
    abbreviation: Country_Abbreviation

    @DbString()
    name: Country_Name

    @ManyToOne()
    @JoinColumn({
        name: 'CONTINENT_ID',
        referencedColumnName: 'CONTINENT_ID'
    })
    continent: Continent

    @OneToMany({ mappedBy: 'country' })
    userAccounts: UserAccount[]

}
