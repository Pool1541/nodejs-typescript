import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { PurchaseProductDTO } from '../dto/purchase-product.dto';
import { validate } from 'class-validator';

export class PurchaseProductMiddleware {
  constructor(private readonly httpREsponse: HttpResponse = new HttpResponse()) {}

  purchaseProductValidator(req: Request, res: Response, next: NextFunction) {
    const { quantityProduct, product, purchase, totalPrice = 0 } = req.body;
    const valid = new PurchaseProductDTO();
    valid.quantityProduct = quantityProduct;
    valid.product = product;
    valid.purchase = purchase;
    valid.totalPrice = totalPrice;
    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpREsponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
