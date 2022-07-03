import { Column, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-traffic-control";
import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { DatabaseType } from "./DatabaseType";

export type Database_LocalId = number
export type Database_Domain = string
export type Database_GUID = string
@Entity()
@Table({
    name: 'DATABASES'
})
export class Database {

    @Id()
    @DbNumber()
    @Column({ name: 'DATABASE_LID' })
    _localId: Database_LocalId

    @DbString()
    @Column({ name: 'DATABASE_DOMAIN' })
    domain: Database_Domain

    @DbString()
    @Column({ name: 'DATABASE_GUID' })
    GUID: Database_GUID

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

    @OneToMany({ mappedBy: 'database' })
    databaseTypes: DatabaseType[]

}
