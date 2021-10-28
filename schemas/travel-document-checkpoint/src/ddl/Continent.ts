import {
    DbNumber,
    DbString,
    Entity,
    GeneratedValue,
    Id,
    OneToMany,
    Table
} from "@airport/air-control";
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

}
