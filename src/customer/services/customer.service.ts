import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async findAll(): Promise<Array<CustomerEntity>> {
    return (await this.execRepository).find();
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async create(body: CustomerEntity): Promise<CustomerEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id: string, body: Partial<CustomerEntity>): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async delete(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
