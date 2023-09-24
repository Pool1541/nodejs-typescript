import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAll(): Promise<Array<UserEntity>> {
    return (await this.execRepository).find();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findWithRelation(id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .select(['user', 'customer.dni', 'customer.address'])
      .where({ id })
      .getOne();
  }

  async create(body: UserDTO): Promise<UserEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id: string, infoUpdate: Partial<UserDTO>): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async delete(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
