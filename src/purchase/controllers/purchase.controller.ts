import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PurchaseService } from '../services/purchase.service';
import { HttpResponse } from '../../shared/response/http.response';

export class PurchaseController {
  constructor(
    private readonly userService: PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchases(req: Request, res: Response) {
    try {
      const data = await this.userService.findAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async getPurchaseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.userService.findById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async createPurchase(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.userService.create(body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async updatePurchase(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;
      const data: UpdateResult = await this.userService.update(id, body);

      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al actualizar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async deletePurchase(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: DeleteResult = await this.userService.delete(id);

      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al eliminar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }
}
