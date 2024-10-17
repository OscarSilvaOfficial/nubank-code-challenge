import { TaxCalculationContract } from "@/core/contracts/services/tax_contract.ts";
import { OperationData } from "@/core/domains/operation/types.ts";

type TaxOutput = {
  tax: number;
};

export class TaxController {
  constructor(private readonly taxService: TaxCalculationContract<OperationData[]>) {}

  calculateTax(batchOperation: OperationData[]) {
    const taxes = this.taxService.execute(batchOperation);
    const output = this.outputParser(taxes);
    return output;
  }

  private outputParser(input: number[]): TaxOutput[] {
    return input.map((data) => ({
      tax: data,
    }));
  }
}
