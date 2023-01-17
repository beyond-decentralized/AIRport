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

export type State_Abbreviation = string;
export type State_Id = number;
export type State_Name = string;

@Entity()
@Table({ name: "STATES" })
export class State {

    @Id()
    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'STATE_ID' })
    id: State_Id;

    @DbString()
    abbreviation: State_Abbreviation

    @DbString()
    name: State_Name

    @ManyToOne()
    @JoinColumn({
        name: 'COUNTRY_ID',
        referencedColumnName: 'COUNTRY_ID'
    })
    country: Country

    @OneToMany({ mappedBy: 'state' })
    metroAreaStates: State[]

    @OneToMany({ mappedBy: 'state' })
    userAccounts: UserAccount[]

}
