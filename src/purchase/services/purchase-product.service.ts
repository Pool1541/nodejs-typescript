import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { PurchaseProductEntity } from '../entities/purchase-product.entity';
import { PurchaseProductDTO } from '../dto/purchase-product.dto';

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor() {
    super(PurchaseProductEntity);
  }

  async findAll(): Promise<Array<PurchaseProductEntity>> {
    return (await this.execRepository).find();
  }

  async findById(id: string): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async create(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id: string, body: Partial<PurchaseProductDTO>): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async delete(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
