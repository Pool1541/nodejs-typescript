import { Request, Response } from 'express';
import { CategoryService } from '../services/Category.service';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService = new CategoryService()) {}

  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.categoryService.findById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.categoryService.create(body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = req.params;
      const data = await this.categoryService.update(id, body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.categoryService.delete(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
