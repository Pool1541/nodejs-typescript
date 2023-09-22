import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column({ unique: true })
  categoryName!: string;

  // Relación uno a muchos con la entidad Product
  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: Array<ProductEntity>;
}
