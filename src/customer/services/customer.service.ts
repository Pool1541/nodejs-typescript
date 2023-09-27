import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async findAll(): Promise<Array<CustomerEntity>> {
    return (await this.execRepository)
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .getMany();
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where({ id })
      .getOne();
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
