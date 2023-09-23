import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';
import { HttpResponse } from '../../shared/response/http.response';

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCustomers(req: Request, res: Response) {
    try {
      const data = await this.customerService.findAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async getCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.customerService.findById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, 'No se encontraron resultados');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.customerService.create(body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async updateCustomer(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = req.params;
      const data = await this.customerService.update(id, body);
      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al actualizar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.customerService.delete(id);
      if (!data.affected) return this.httpResponse.NotFound(res, 'Error al eliminar');

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      console.error(error);
      return this.httpResponse.Ok(res, error);
    }
  }
}
