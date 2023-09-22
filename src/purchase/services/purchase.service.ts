import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { PurchaseDTO } from '../dto/purchase.dto';
import { PurchaseEntity } from '../entities/purchase.entity';

export class PurchaseService extends BaseService<PurchaseEntity> {
  constructor() {
    super(PurchaseEntity);
  }

  async findAll(): Promise<Array<PurchaseEntity>> {
    return (await this.execRepository).find();
  }

  async findById(id: string): Promise<PurchaseEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async create(body: PurchaseDTO): Promise<PurchaseEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id: string, body: Partial<PurchaseDTO>): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async delete(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
