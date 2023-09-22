import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../../shared/response/http.response';
import { PurchaseProductService } from '../services/purchase-product.service';

export class PurchaseProductController {
  constructor(
    private readonly userService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchaseProducts(req: Request, res: Response) {
    try {
      const data = await this.userService.findAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async getPurchaseProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.userService.findById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async createPurchaseProduct(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.userService.create(body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async updatePurchaseProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;
      const data: UpdateResult = await this.userService.update(id, body);

      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al actualizar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }

  async deletePurchaseProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: DeleteResult = await this.userService.delete(id);

      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al eliminar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Error(res, error);
    }
  }
}
