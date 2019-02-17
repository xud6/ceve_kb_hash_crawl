import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Killmail } from "./Killmail";

@Entity()
export class KmAuthinfo {
    @PrimaryColumn()
    id: number;

    @Column("varchar", { length: 100 })
    hash: string

    @OneToOne(type => Killmail, {
        onDelete: "SET NULL",
        nullable: true
    })
    @JoinColumn()
    killmail: Killmail;
}
