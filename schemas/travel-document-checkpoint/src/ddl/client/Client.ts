import { Client_Domain, Client_GUID, Client_LocalId, IClient } from "@airport/ground-control";
import {
    Column,
    DbNumber,
    DbString,
    Entity,
    Id,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Table
} from "@airport/tarmaq-entity";

import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { ClientType } from "./ClientType";

@Entity()
@Table({
    name: 'CLIENTS'
})
export class Client
    implements IClient {

    @Id()
    @DbNumber()
    @Column({ name: 'CLIENT_LID', nullable: false })
    _localId: Client_LocalId

    @DbString()
    @Column({ name: 'CLIENT_DOMAIN', nullable: false })
    domain?: Client_Domain

    @DbString()
    @Column({ name: 'CLIENT_GUID', nullable: false })
    GUID?: Client_GUID

    @ManyToOne()
    @JoinColumn({
        name: 'CONTINENT_ID',
        referencedColumnName: 'CONTINENT_ID', nullable: true
    })
    continent?: Continent

    @ManyToOne()
    @JoinColumn({
        name: 'COUNTRY_ID',
        referencedColumnName: 'COUNTRY_ID', nullable: true
    })
    country?: Country

    @ManyToOne()
    @JoinColumn({
        name: 'STATE_ID',
        referencedColumnName: 'STATE_ID', nullable: true
    })
    state?: State

    @ManyToOne()
    @JoinColumn({
        name: 'METRO_AREA_ID',
        referencedColumnName: 'METRO_AREA_ID', nullable: true
    })
    metroArea?: MetroArea

    @OneToMany({ mappedBy: 'client' })
    clientTypes?: ClientType[]

}
