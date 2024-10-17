import { TaxCalculationContract } from "@/core/contracts/services/tax_contract.ts";
import { OperationData } from "@/core/domains/operation/types.ts";

type TaxOutput = {
  tax: number;
};

export function TaxCalculationController(
  taxService: TaxCalculationContract<OperationData[]>,
  batchOperation: OperationData[],
) {
  const taxes = calculateTax(taxService, batchOperation)
  return taxes
}

function calculateTax(
  taxService: TaxCalculationContract<OperationData[]>,
  batchOperation: OperationData[],
) {
  const taxes = taxService.execute(batchOperation);
  const output = outputParser(taxes);
  return output;
}

function outputParser(input: number[]): TaxOutput[] {
  return input.map((data) => ({
    tax: data,
  }));
}