import { Continent_Id, Continent_Name } from "@airport/ground-control";
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

@Entity()
@Table({ name: "CONTINENTS" })
export class Continent {

    @Id()
    @DbNumber()
    @Column({ name: 'CONTINENT_ID', nullable: false })
    id?: Continent_Id

    @DbString()
    @Column({ name: 'CONTINENT_NAME', nullable: false })
    name?: Continent_Name

    @OneToMany({ mappedBy: 'continent' })
    countries?: Country[]

    @OneToMany({ mappedBy: 'continent' })
    userAccounts?: UserAccount[]

}
