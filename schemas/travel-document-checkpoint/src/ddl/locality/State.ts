import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-traffic-control";
import { User } from "../User";
import { Country } from "./Country";

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
    users: User[]

}