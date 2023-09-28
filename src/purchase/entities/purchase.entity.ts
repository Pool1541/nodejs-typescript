import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { PurchaseProductEntity } from './purchase-product.entity';

export enum StatusType {
  PURCHASED = 'PURCHASED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export enum PaymentMethodType {
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

@Entity({ name: 'purchase' })
export class PurchaseEntity extends BaseEntity {
  @Column({ type: 'enum', enum: StatusType, nullable: false })
  status!: StatusType;

  @Column({ type: 'enum', enum: PaymentMethodType, nullable: false })
  paymentMethod!: PaymentMethodType;

  //Relación muchos a uno con la entidad Customer
  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;

  @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.purchase)
  purchaseProduct!: PurchaseProductEntity[];
}
