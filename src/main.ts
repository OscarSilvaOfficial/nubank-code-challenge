import { TaxCalculationService } from "@/core/services/tax.service.ts";
import {
  OperationData,
  OperationTypes,
} from "@/core/domains/operation/types.ts";
import { CommandLineInterface } from "./application/external/cli.ts";
import { TaxCalculationController } from "@/application/internal/controllers/tax.controller.ts";


type OperationUnitInput = {
  operation: string;
  "unit-cost": number;
  quantity: number;
};

function inputParser(input: string): OperationData[][] {
  const arrayStrings = input.replaceAll(" ", "").match(/\[[^\[\]]+\]/g);

  if (arrayStrings && arrayStrings.length > 1) {
    return arrayStrings.map((arrayString) =>
      JSON.parse(arrayString).map((data: OperationUnitInput) => ({
        type: data.operation as OperationTypes,
        unitCost: data["unit-cost"],
        quantity: data.quantity,
      }))
    );
  }

  return [
    JSON.parse(input).map((data: OperationUnitInput) => ({
      type: data.operation as OperationTypes,
      unitCost: data["unit-cost"],
      quantity: data.quantity,
    })),
  ];
}

async function main() {
  const cli = new CommandLineInterface();

  try {
    const fileContent = await cli.getFileContent();

    for (const execution of inputParser(fileContent.trim())) {
      const taxes = TaxCalculationController(new TaxCalculationService(), execution)
      console.log(JSON.stringify(taxes));
    }
  } catch (err) {
    console.error("Read file error", err.message);
  }
}

main();
