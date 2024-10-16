import { TaxCalculationService } from "@/core/services/tax.service.ts";
import {
  OperationData,
  OperationTypes,
} from "@/core/domains/operation/types.ts";
import { CommandLineInterface } from "./application/external/cli.ts";
import { TaxCalculationContract } from "@/core/contracts/services/tax_contract.ts";

type OperationUnitInput = {
  operation: string;
  "unit-cost": number;
  quantity: number;
};

function inputParser(input: string): OperationData[][] {
  const arrayStrings = input.replaceAll(' ', '').match(/\[[^\[\]]+\]/g);

  if (arrayStrings && arrayStrings.length > 1) {
    return arrayStrings.map((arrayString) =>
      JSON.parse(arrayString).map((data: OperationUnitInput) => ({
        type: data.operation as OperationTypes,
        unitCost: data["unit-cost"],
        quantity: data.quantity,
      }))
    );
  }

  return [JSON.parse(input).map((data: OperationUnitInput) => ({
    type: data.operation as OperationTypes,
    unitCost: data["unit-cost"],
    quantity: data.quantity,
  }))];
}

function outputParser(input: number[]): { tax: number }[] {
  return input.map((data) => ({
    tax: data,
  }));
}

async function main() {

  const cli = new CommandLineInterface();
  
  try {
    const fileContent = await cli.getFileContent();
    
    for (const execution of inputParser(fileContent.trim())) {
      const service: TaxCalculationContract<OperationData[]> =
        new TaxCalculationService();

      const taxResults = outputParser(service.execute(execution));
      console.log(JSON.stringify(taxResults));
    }
  } catch (err) {
    console.error("Read file error", err.message);
  }
}

main();
