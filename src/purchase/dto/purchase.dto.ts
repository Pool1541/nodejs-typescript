import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../config/base.dto';
import { PaymentMethodType, StatusType } from '../entities/purchase.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';

export class PurchaseDTO extends BaseDTO {
  @IsNotEmpty()
  status!: StatusType;

  @IsNotEmpty()
  paymentMethod!: PaymentMethodType;

  @IsNotEmpty()
  customer!: CustomerEntity;
}
