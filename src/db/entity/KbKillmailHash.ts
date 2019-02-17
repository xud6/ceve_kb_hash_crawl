import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class KbKillmailHash {
    @PrimaryColumn()
    id: number;

    @Column("varchar", { length: 100 })
    hash: string
}
