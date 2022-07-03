import { Column, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, NumberOperation, OneToMany, Table } from "@airport/air-traffic-control";

import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { ClientType } from "./ClientType";

export type Client_LocalId = number
export type Client_Domain = string
export type Client_GUID = string
@Entity()
@Table({
    name: 'CLIENTS'
})
export class Client {

    @Id()
    @DbNumber()
    @Column({ name: 'CLIENT_LID' })
    _localId: Client_LocalId

    @DbString()
    @Column({ name: 'CLIENT_DOMAIN' })
    domain: Client_Domain

    @DbString()
    @Column({ name: 'CLIENT_GUID' })
    GUID: Client_GUID

    @ManyToOne()
    @JoinColumn({
        name: 'CONTINENT_LID',
        referencedColumnName: 'CONTINENT_LID', nullable: true
    })
    continent?: Continent

    @ManyToOne()
    @JoinColumn({
        name: 'COUNTRY_LID',
        referencedColumnName: 'COUNTRY_LID', nullable: true
    })
    country?: Country

    @ManyToOne()
    @JoinColumn({
        name: 'STATE_LID',
        referencedColumnName: 'STATE_LID', nullable: true
    })
    state?: State

    @ManyToOne()
    @JoinColumn({
        name: 'METRO_AREA_LID',
        referencedColumnName: 'METRO_AREA_LID', nullable: true
    })
    metroArea?: MetroArea

    @OneToMany({ mappedBy: 'client' })
    clientTypes: ClientType[]

}
