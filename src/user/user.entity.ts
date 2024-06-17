import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ length: 500, unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}
