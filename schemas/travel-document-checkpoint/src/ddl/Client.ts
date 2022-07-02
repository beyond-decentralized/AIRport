import { DbString, Entity, Id, JoinColumn, ManyToOne } from "@airport/air-traffic-control";

import { Continent } from './locality/Continent';
import { Country } from './locality/Country';
import { MetroArea } from './locality/MetroArea';
import { State } from './locality/State';

@Entity()
export class Client {

    @Id()
    id: number

    domain: string

    @DbString()
    GUID: string

    @ManyToOne()
    @JoinColumn({ name: 'CONTINENT_ID', referencedColumnName: 'ID', nullable: true })
    continent?: Continent

    @ManyToOne()
    @JoinColumn({ name: 'COUNTRY_ID', referencedColumnName: 'ID', nullable: true })
    country?: Country

    @ManyToOne()
    @JoinColumn({ name: 'STATE_ID', referencedColumnName: 'ID', nullable: true })
    state?: State

    @ManyToOne()
    @JoinColumn({ name: 'METRO_AREA_ID', referencedColumnName: 'ID', nullable: true })
    metroArea?: MetroArea

}
