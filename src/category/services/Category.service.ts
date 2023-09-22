import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { CategoryDTO } from '../dto/Category.dto';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAll(): Promise<Array<CategoryEntity>> {
    return (await this.execRepository).find();
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async create(body: CategoryDTO): Promise<CategoryEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id: string, body: Partial<CategoryDTO>): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async delete(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
