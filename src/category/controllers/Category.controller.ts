import { Request, Response } from 'express';
import { CategoryService } from '../services/Category.service';
import { HttpResponse } from '../../shared/response/http.response';

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAll();

      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.categoryService.findById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.categoryService.create(body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = req.params;
      const data = await this.categoryService.update(id, body);
      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al actualizar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.categoryService.delete(id);
      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al eliminar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }
}
