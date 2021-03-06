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
import { UserAccount } from "../UserAccount";
import { Country } from "./Country";
import { MetroAreaState } from "./MetroAreaState";

export type MetroArea_Id = number;
export type MetroArea_Name = string;

@Entity()
@Table({ name: "METRO_AREAS" })
export class MetroArea {

    @Id()
    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'METRO_AREA_ID' })
    id: MetroArea_Id;

    @DbString()
    name: MetroArea_Name

    @ManyToOne()
    @JoinColumn({
        name: 'COUNTRY_ID',
        referencedColumnName: 'COUNTRY_ID'
    })
    country: Country

    @OneToMany({ mappedBy: 'metroArea' })
    metroAreaStates: MetroAreaState[]

    @OneToMany({ mappedBy: 'metroArea' })
    userAccounts: UserAccount[]

}