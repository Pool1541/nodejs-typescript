import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(private readonly productService: ProductService = new ProductService()) {}

  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.productService.findById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await this.productService.create(body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = req.params;
      const data = await this.productService.update(id, body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.productService.delete(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
