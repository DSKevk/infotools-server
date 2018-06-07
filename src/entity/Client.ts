import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public nom: string;

    @Column('varchar')
    public prenom: string;

    @Column('varchar')
    public address: string;

    @Column('varchar')
    public telephone: string;

    @Column('varchar')
    public mail: string;

}
