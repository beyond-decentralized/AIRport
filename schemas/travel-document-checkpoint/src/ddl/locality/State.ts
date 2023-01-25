import { IState, State_Abbreviation, State_Id, State_Name } from "@airport/ground-control";
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

@Entity()
@Table({ name: "STATES" })
export class State
    implements IState {

    @Id()
    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'STATE_ID' })
    id: State_Id;

    @DbString()
    abbreviation?: State_Abbreviation

    @DbString()
    name?: State_Name

    @ManyToOne()
    @JoinColumn({
        name: 'COUNTRY_ID',
        referencedColumnName: 'COUNTRY_ID'
    })
    country?: Country

    @OneToMany({ mappedBy: 'state' })
    metroAreaStates?: MetroAreaState[]

    @OneToMany({ mappedBy: 'state' })
    userAccounts?: UserAccount[]

}
