import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { ProductDTO } from '../dto/product.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductService extends BaseService<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }

  async findAll(): Promise<Array<ProductEntity>> {
    return (await this.execRepository)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .select(['product', 'category.categoryName'])
      .getMany();
  }

  async findById(id: string): Promise<ProductEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .select(['product', 'category.categoryName'])
      .where({ id })
      .getOne();
  }

  async create(body: ProductDTO): Promise<ProductEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id: string, body: Partial<ProductDTO>): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async delete(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
