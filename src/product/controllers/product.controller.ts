import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { HttpResponse } from '../../shared/response/http.response';

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.findAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.productService.findById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.productService.create(body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = req.params;
      const data = await this.productService.update(id, body);
      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al actualizar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.productService.delete(id);
      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al eliminar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }
}
