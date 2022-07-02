import {
    DbNumber,
    DbString,
    Entity,
    GeneratedValue,
    Id,
    OneToMany,
    Table
} from "@airport/air-traffic-control";
import { User } from "../User";
import { Country } from "./Country";

export type Continent_Id = number;
export type Continent_Name = string;

@Entity()
@Table({ name: "CONTINENTS" })
export class Continent {

    @Id()
    @GeneratedValue()
    @DbNumber()
    id: Continent_Id;

    @DbString()
    name: Continent_Name

    @OneToMany({ mappedBy: 'continent' })
    countries: Country[]

    @OneToMany({ mappedBy: 'continent' })
    users: User[]

}
