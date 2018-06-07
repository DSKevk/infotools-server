import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RendezVous {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('datetime')
    public date: Date;

    @Column('int')
    public clientID: string;

    @Column('int')
    public commercialID: string;

}
