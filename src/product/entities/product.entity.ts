import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { PurchaseProductEntity } from '../../purchase/entities/purchase-product.entity';

@Entity({ name: 'Product' })
export class ProductEntity extends BaseEntity {
  @Column()
  productName!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  //Relación muchos a uno con la entidad Category
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.product)
  purchaseProduct!: Array<PurchaseProductEntity>;
}
