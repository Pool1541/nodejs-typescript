import { DeleteResult, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseService } from '../../config/base.service';
import { RoleType, UserDTO } from '../dto/user.dto';
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

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne();
  }

  async findUserByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne();
  }

  async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
    const user = (await this.execRepository)
      .createQueryBuilder('user')
      .where({ id })
      .andWhere({ role })
      .getOne();

    return user;
  }

  async create(body: UserDTO): Promise<UserEntity> {
    const newUser = (await this.execRepository).create(body);
    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash;

    return (await this.execRepository).save(newUser);
  }

  async update(id: string, infoUpdate: Partial<UserDTO>): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async delete(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
