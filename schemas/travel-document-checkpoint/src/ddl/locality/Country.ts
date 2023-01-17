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
} from "@airport/tarmaq-entity";
import { Continent } from "./Continent";
import { UserAccount } from "../UserAccount";
import { Country_Abbreviation, Country_Id, Country_Name } from "@airport/ground-control";

@Entity()
@Table({ name: "COUNTRIES" })
export class Country {

    @Id()
    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'COUNTRY_ID', nullable: false })
    id?: Country_Id

    @DbString()
    @Column({ name: 'ABBREVIATION', nullable: false })
    abbreviation?: Country_Abbreviation

    @DbString()
    @Column({ name: 'COUNTRY_NAME', nullable: false })
    name?: Country_Name

    @ManyToOne()
    @JoinColumn({
        name: 'CONTINENT_ID',
        referencedColumnName: 'CONTINENT_ID'
    })
    continent?: Continent

    @OneToMany({ mappedBy: 'country' })
    userAccounts?: UserAccount[]

}
