import { Database_Domain, Database_GUID, Database_LocalId, IDatabase } from "@airport/ground-control";
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
import { DatabaseType } from "./DatabaseType";

@Entity()
@Table({
    name: 'DATABASES'
})
export class Database
    implements IDatabase {

    @Id()
    @DbNumber()
    @Column({ name: 'DATABASE_LID', nullable: false })
    _localId: Database_LocalId

    @DbString()
    @Column({ name: 'DATABASE_DOMAIN', nullable: false })
    domain: Database_Domain

    @DbString()
    @Column({ name: 'DATABASE_GUID', nullable: false })
    GUID: Database_GUID

    @ManyToOne()
    @JoinColumn({ name: 'CONTINENT_ID', nullable: true })
    continent?: Continent

    @ManyToOne()
    @JoinColumn({ name: 'COUNTRY_ID', nullable: true })
    country?: Country

    @ManyToOne()
    @JoinColumn({ name: 'STATE_ID', nullable: true })
    state?: State

    @ManyToOne()
    @JoinColumn({ name: 'METRO_AREA_ID', nullable: true })
    metroArea?: MetroArea

    @OneToMany({ mappedBy: 'database' })
    databaseTypes?: DatabaseType[]

}
