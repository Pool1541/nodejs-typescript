import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
  constructor(private readonly customerService: CustomerService = new CustomerService()) {}

  async getCustomers(req: Request, res: Response) {
    try {
      const data = await this.customerService.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.customerService.findById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.customerService.create(body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async updateCustomer(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = req.params;
      const data = await this.customerService.update(id, body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.customerService.delete(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
