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
import { Continent } from "./Continent";
import { User } from "./User";

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
