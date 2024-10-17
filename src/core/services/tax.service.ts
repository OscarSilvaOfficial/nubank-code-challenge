import { Operation } from "@/core/domains/operation/index.ts";
import { OperationTypeEnum } from "../domains/operation/enums.ts";
import { TaxCalculationContract } from "../contracts/services/tax_contract.ts";
import { OperationData } from "@/core/domains/operation/types.ts";

export class TaxCalculationService
  implements TaxCalculationContract<OperationData[]> {

  private static TAX_ON_PROFIT = 0.2;

  execute(operations: OperationData[]): number[] {
    return operations.reduce((acc, operationData) => {
      const operation = new Operation(
        operationData.type,
        operationData.unitCost,
        operationData.quantity,
      );

      const { weightedAveragePrice, totalQuantity, accumulatedLoss, tax } = this.processOperation(
        acc.weightedAveragePrice,
        acc.totalQuantity,
        acc.accumulatedLoss,
        operation,
      );

      return {
        weightedAveragePrice,
        totalQuantity,
        accumulatedLoss,
        taxValues: [...acc.taxValues, tax],
      };
    }, {
      weightedAveragePrice: 0,
      totalQuantity: 0,
      accumulatedLoss: 0,
      taxValues: [] as number[],
    }).taxValues;
  }

  private processOperation(
    weightedAveragePrice: number,
    totalQuantity: number,
    accumulatedLoss: number,
    operation: Operation,
  ) {
    if (operation.getType() === OperationTypeEnum.BUY) {
      const { newWeightedAveragePrice, newTotalQuantity } = this.updateWeightedAveragePrice(
        weightedAveragePrice,
        totalQuantity,
        operation.getUnitCost(),
        operation.getQuantity(),
      );
      return { weightedAveragePrice: newWeightedAveragePrice, totalQuantity: newTotalQuantity, accumulatedLoss, tax: 0 };
    }

    if (operation.getType() === OperationTypeEnum.SELL) {
      const { newAccumulatedLoss, newTotalQuantity, tax } = this.registerSale(
        weightedAveragePrice,
        totalQuantity,
        accumulatedLoss,
        operation.getUnitCost(),
        operation.getQuantity(),
      );
      return { weightedAveragePrice, totalQuantity: newTotalQuantity, accumulatedLoss: newAccumulatedLoss, tax };
    }

    return { weightedAveragePrice, totalQuantity, accumulatedLoss, tax: 0 };
  }

  private registerSale(
    weightedAveragePrice: number,
    totalQuantity: number,
    accumulatedLoss: number,
    unitCost: number,
    quantity: number,
  ): { newAccumulatedLoss: number; newTotalQuantity: number; tax: number } {
    const profitOrLoss = (unitCost - weightedAveragePrice) * quantity;
    const totalSaleValue = unitCost * quantity;

    if (this.isProfitWithTax(profitOrLoss, accumulatedLoss) && !this.isTaxFreeByTotalAmount(totalSaleValue)) {
      const profitOrLoss = ((unitCost - weightedAveragePrice) * quantity) - accumulatedLoss;
      return {
        newAccumulatedLoss: 0,
        newTotalQuantity: totalQuantity - quantity,
        tax: profitOrLoss * TaxCalculationService.TAX_ON_PROFIT,
      };
    }

    if (this.isProfit(profitOrLoss, accumulatedLoss) && !this.isTaxFreeByTotalAmount(totalSaleValue)) {
      return {
        newAccumulatedLoss: accumulatedLoss - profitOrLoss,
        newTotalQuantity: totalQuantity - quantity,
        tax: 0,
      };
    }

    if (this.isLoss(profitOrLoss)) {
      return {
        newAccumulatedLoss: accumulatedLoss + Math.abs(profitOrLoss),
        newTotalQuantity: totalQuantity - quantity,
        tax: 0,
      };
    }

    return {
      newAccumulatedLoss: accumulatedLoss,
      newTotalQuantity: totalQuantity - quantity,
      tax: 0,
    };
  }

  private isTaxFreeByTotalAmount(totalSaleValue: number): boolean {
    return totalSaleValue <= 20000;
  }

  private isProfit(profitOrLoss: number, accumulatedLoss: number): boolean {
    return profitOrLoss > 0 && accumulatedLoss > 0 && accumulatedLoss >= profitOrLoss;
  }

  private isProfitWithTax(profitOrLoss: number, accumulatedLoss: number): boolean {
    return profitOrLoss > 0 && (accumulatedLoss <= 0 || accumulatedLoss < profitOrLoss);
  }

  private isLoss(profitOrLoss: number): boolean {
    return profitOrLoss < 0;
  }

  private updateWeightedAveragePrice(
    currentWeightedAveragePrice: number,
    currentTotalQuantity: number,
    unitCost: number,
    quantity: number,
  ): { newWeightedAveragePrice: number; newTotalQuantity: number } {
    const totalValueBefore = currentTotalQuantity * currentWeightedAveragePrice;
    const totalValueNewPurchase = quantity * unitCost;

    const newWeightedAveragePrice = (totalValueBefore + totalValueNewPurchase) /
      (currentTotalQuantity + quantity);

    const newTotalQuantity = currentTotalQuantity + quantity;
    return { newWeightedAveragePrice, newTotalQuantity };
  }
}
