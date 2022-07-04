import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-traffic-control";
import { User } from "../User";
import { Country } from "./Country";
import { State } from "./State";

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
    metroAreaStates: State[]

    @OneToMany({ mappedBy: 'metroArea' })
    users: User[]

}