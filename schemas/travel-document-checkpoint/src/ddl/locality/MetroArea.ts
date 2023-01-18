import { MetroArea_Id, MetroArea_Name } from "@airport/ground-control";
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
@Table({ name: "METRO_AREAS" })
export class MetroArea {

    @Id()
    @GeneratedValue()
    @DbNumber()
    @Column({ name: 'METRO_AREA_ID' })
    id: MetroArea_Id;

    @DbString()
    name?: MetroArea_Name

    @ManyToOne()
    @JoinColumn({
        name: 'COUNTRY_ID',
        referencedColumnName: 'COUNTRY_ID'
    })
    country?: Country

    @OneToMany({ mappedBy: 'metroArea' })
    metroAreaStates?: MetroAreaState[]

    @OneToMany({ mappedBy: 'metroArea' })
    userAccounts?: UserAccount[]

}
