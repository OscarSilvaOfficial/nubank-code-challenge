import { Operation } from "@/core/domains/operation/index.ts";
import { OperationTypeEnum } from "../domains/operation/enums.ts";
import { TaxCalculationContract } from "../contracts/services/tax_contract.ts";
import { OperationData } from "@/core/domains/operation/types.ts";

export class TaxCalculationService
  implements TaxCalculationContract<OperationData[]> {

  private static TAX_ON_PROFIT = 0.2;

  private accumulatedLoss: number = 0;
  private taxValues: number[] = [];
  private weightedAveragePrice: number = 0;
  private totalQuantity: number = 0;

  execute(operations: OperationData[]): number[] {
    for (const operationData of operations) {
      const operation = new Operation(
        operationData.type,
        operationData.unitCost,
        operationData.quantity,
      );

      if (operation.getType() === OperationTypeEnum.BUY) {
        this.updateWeightedAveragePrice(
          operation.getUnitCost(),
          operation.getQuantity(),
        );
        this.taxValues.push(0);
      }

      if (operation.getType() === OperationTypeEnum.SELL) {
        const tax = this.registerSale(
          operation.getUnitCost(),
          operation.getQuantity(),
        );
        this.taxValues.push(+tax.toFixed(2));
      }
    }

    return this.taxValues;
  }

  private registerSale(unitCost: number, quantity: number): number {
    let profitOrLoss = (unitCost - this.weightedAveragePrice) * quantity;
    const totalSaleValue = unitCost * quantity;

    if (
      this.isProfitWithTax(profitOrLoss) &&
      !this.isTaxFreeByTotalAmount(totalSaleValue)
    ) {
      profitOrLoss -= this.accumulatedLoss;
      this.totalQuantity -= quantity;
      this.accumulatedLoss = 0;
      const taxDue = profitOrLoss * TaxCalculationService.TAX_ON_PROFIT;
      return taxDue;
    }

    if (
      this.isProfit(profitOrLoss) &&
      !this.isTaxFreeByTotalAmount(totalSaleValue)
    ) {
      this.accumulatedLoss -= profitOrLoss;
      this.totalQuantity -= quantity;
      return 0;
    }

    if (this.isLoss(profitOrLoss)) {
      this.accumulatedLoss += Math.abs(profitOrLoss);
      this.totalQuantity -= quantity;
      return 0;
    }

    if (this.isTaxFreeByTotalAmount(totalSaleValue)) return 0;

    return 0;
  }

  private isTaxFreeByTotalAmount(totalSaleValue: number): boolean {
    return totalSaleValue <= 20000;
  }

  private isProfit(profitOrLoss: number): boolean {
    return profitOrLoss > 0 &&
      (this.accumulatedLoss > 0 && this.accumulatedLoss >= profitOrLoss);
  }

  private isProfitWithTax(profitOrLoss: number): boolean {
    return profitOrLoss > 0 &&
      (this.accumulatedLoss <= 0 || this.accumulatedLoss < profitOrLoss);
  }

  private isLoss(profitOrLoss: number): boolean {
    return profitOrLoss < 0;
  }

  private updateWeightedAveragePrice(unitCost: number, quantity: number): void {
    const totalValueBefore = this.totalQuantity * this.weightedAveragePrice;
    const totalValueNewPurchase = quantity * unitCost;
    this.weightedAveragePrice = (totalValueBefore + totalValueNewPurchase) /
      (this.totalQuantity + quantity);
    this.totalQuantity += quantity;
  }
}
