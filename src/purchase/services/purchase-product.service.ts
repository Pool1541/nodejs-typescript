import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service';
import { PurchaseProductEntity } from '../entities/purchase-product.entity';
import { PurchaseProductDTO } from '../dto/purchase-product.dto';
import { ProductService } from '../../product/services/product.service';

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor(private readonly productService: ProductService = new ProductService()) {
    super(PurchaseProductEntity);
  }

  async findAll(): Promise<Array<PurchaseProductEntity>> {
    return (await this.execRepository).find();
  }

  async findById(id: string): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async create(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
    const newPurchaseProduct = (await this.execRepository).create(body);
    const productId = newPurchaseProduct.product as unknown as string;
    const product = await this.productService.findById(productId);
    newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct;
    return (await this.execRepository).save(newPurchaseProduct);
  }

  async update(id: string, body: Partial<PurchaseProductDTO>): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async delete(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
