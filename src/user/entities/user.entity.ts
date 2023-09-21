import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Exclude()
  @Column()
  password!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  // Relación uno a uno con la entidad customer
  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}
