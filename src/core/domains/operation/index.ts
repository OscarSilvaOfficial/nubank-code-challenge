import { OperationTypeEnum } from "./enums.ts";

export class Operation {
  constructor(
    private type: 'buy' | 'sell',
    private unitCost: number,
    private quantity: number,
  ) {
    this.typeValidation();
  }

  getType(): 'buy' | 'sell' {
    return this.type;
  }

  getUnitCost(): number {
    return this.unitCost;
  }

  getQuantity(): number {
    return this.quantity;
  }

  typeValidation() {
    const isValidType =
      !(Object.values(OperationTypeEnum) as unknown as string[]).includes(
        this.type,
      );

    if (isValidType) throw new Error(`Operation ${this.type} is unsupported`);
  }
}
