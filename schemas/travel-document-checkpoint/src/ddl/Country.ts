import {
    DbNumber,
    DbString,
    Entity,
    GeneratedValue,
    Id,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Table
} from "@airport/air-control";
import { User } from "../to_be_generated/runtime-index";
import { Continent } from "./Continent";

export type Country_Id = number;
export type Country_Name = string;

@Entity()
@Table({ name: "COUNTRIES" })
export class Country {

    @Id()
    @GeneratedValue()
    @DbNumber()
    id: Country_Id;

    @DbString()
    name: Country_Name

    @ManyToOne()
    @JoinColumn({ name: 'CONTINENT_ID', referencedColumnName: 'ID' })
    continent: Continent

    @OneToMany({ mappedBy: 'country' })
    users: User[]

}
