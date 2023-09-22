import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { PurchaseProductEntity } from './purchase-product.entity';

export type StatusType = 'purchased' | 'loading' | 'rejected';
export type PaymentMethodType = 'cash' | 'credit' | 'debit';

@Entity({ name: 'purchase' })
export class PurchaseEntity extends BaseEntity {
  @Column()
  status!: StatusType;

  @Column()
  paymentMethod!: PaymentMethodType;

  //Relación muchos a uno con la entidad Customer
  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;

  @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.purchase)
  purchaseProduct!: PurchaseProductEntity[];
}
